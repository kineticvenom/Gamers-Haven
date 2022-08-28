import {useState, useEffect} from 'react'
import axios from 'axios'
import AnimePostList from '../components/AnimePostList'
import AnimePostForm from '../components/AnimePostForm'
import { Button } from 'react-bootstrap'


function AnimeDetailPages(props) {
    const category ='anime'

    const {currentAnime, setCurrentAnime} = props
    
    const [posts, setPosts] = useState([])
    const [showForm,setShowForm] =useState(false)

    console.log(props)

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
        <div className='anime-page'>
            {currentAnime ?
                <div>
                    <div className='details'>
                        <div className='details-card-anime'>
                            <h1>{currentAnime.title}</h1>
                            <img width='300px' height='300px' src={currentAnime.image} alt='reload'></img>
                            <Button onClick={addFavorite}>Add Favorite</Button>
                        </div>
                        <p className='details-info'>{currentAnime.description} <h5>Rated: {currentAnime.age}</h5> <h5>Episodes: {currentAnime.episodes}</h5> <h5>User Rating: {currentAnime.rating}</h5> <h5>Released: {currentAnime.release}</h5></p>
                    </div>
                    <div>
                        <h1 >Discussions</h1>
                        <Button onClick={() => { setShowForm(!showForm) }}>New Post</Button>
                        {showForm ? <AnimePostForm currentAnime={currentAnime}/>: ''}
                        {currentAnime ? <AnimePostList posts={posts} grabPosts={grabPosts} /> : <h4>Loading posts..</h4>}
                    </div>   
       
                </div> : <h1>Loading..</h1>
            } 
         </div>
    )
}

export default AnimeDetailPages