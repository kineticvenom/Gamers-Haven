import {useState, useEffect} from 'react'
import axios from 'axios'
import AnimePostList from '../components/AnimePostList'
import AnimePostForm from '../components/AnimePostForm'


function AnimeDetailPages(props) {
    const category ='anime'

    const {currentAnime, setCurrentAnime} = props
    
    const [posts, setPosts] = useState([])
    const [showForm,setShowForm] =useState(false)


    useEffect(() => {
        setCurrentAnime(JSON.parse(window.sessionStorage.getItem("currentAnime")));
      }, []);
    
      useEffect(() => {
        window.sessionStorage.setItem("currentAnime", JSON.stringify(currentAnime));
      }, [currentAnime]);

    
      function grabPosts() {
        axios.post('/post/get', {
            'id': currentAnime.id,
            'category': category,
        }    
        ).then((response) => {
            
            setPosts(response.data.posts)
            console.log(response.data.posts)
            
        })
      }
    
    
    function addFavorite() {
        axios.post('favorite/create', {
            'api_id': currentAnime.id,
            'category' : category,
            'title' : currentAnime.title,
            'image' : currentAnime.image          
        }
        ).then((response)=>{
            console.log('response:',response)
            if(response.data.Success){
                window.alert('This anime is now a Favorite!')
            }
        }) 
    }
    
    
    return (
        <div>
            {currentAnime ?
                <div>
                    <button onClick={addFavorite}>Add Favorite</button>
                    <div className="py-3"></div>
                    <h1>{currentAnime.title}</h1>
                    <img width='300px' height='300px' src={currentAnime.image} alt='reload'></img>
                    <h5>{currentAnime.description}</h5>
                    <div className="py-3"></div>
                    <div>
                            <h1 >Discussions:</h1>
                            <button onClick={() => { setShowForm(!showForm) }}>New Post</button>
                            {showForm ? <AnimePostForm currentAnime={currentAnime}/>: ''}
                            {currentAnime ? <AnimePostList posts={posts} grabPosts={grabPosts} /> : <h4>Loading posts..</h4>
                            }
                        </div>   
                    <div className="py-2"></div>
                </div> : <h1>Loading..</h1>
            } 
         </div>
    )
}

export default AnimeDetailPages