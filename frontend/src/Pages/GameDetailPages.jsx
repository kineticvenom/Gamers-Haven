import {useState, useEffect} from 'react'
import axios from 'axios'
import GamePostList from '../components/GamePostList'
import GamePostForm from '../components/GamePostForm'


function GameDetailPages(props) {
    const category = 'game'

    const {currentGame, setCurrentGame} = props
    
    const [posts, setPosts] = useState([])
    const [showForm,setShowForm] =useState(false)


    useEffect(() => {
        setCurrentGame(JSON.parse(window.sessionStorage.getItem("currentGame")));
      }, []);
    
      useEffect(() => {
        window.sessionStorage.setItem("currentGame", JSON.stringify(currentGame));
      }, [currentGame]);



    

    function grabPosts() {
        axios.post('/post/get', {
            'id': currentGame.id,
            'category': category,
        }    
        ).then((response) => {
            
            setPosts(response.data.posts)
            console.log(response.data.posts)
            
        })
    }


    function addFavorite() {
        axios.post('favorite/create', {
            'api_id': currentGame.id,
            'category' : category,
            'title' : currentGame.name,
            'image' : currentGame.background_image          
        }
        ).then((response)=>{
            console.log('response:',response)
            if(response.data.Success){
                window.alert('This game is now a Favorite!')
            }
        }) 
    }
    
    
    
    
    return (
        <div >
                {
                currentGame ?
                    <div>
                        <button onClick={addFavorite}>Add Favorite</button>
                        <div className="py-3"></div>
                        <h1>{currentGame.name}</h1>
                        <img width='300px' height='300px' src={currentGame.background_image} alt='reload'></img>
                        <h5>{currentGame.description_raw}</h5>
                        <div className="py-3"></div>
                        <div>
                            <h1 >Discussions:</h1>
                            <button onClick={() => { setShowForm(!showForm) }}>New Post</button>
                            {showForm ? <GamePostForm currentGame={currentGame} />: ''}
                            {currentGame ? <GamePostList posts={posts} grabPosts={grabPosts} /> : <h4>Loading posts..</h4>
                            }
                        </div>   
                    <div className="py-2"></div>
                </div> : <h1>Loading..</h1>
                } 
            </div>
    )

}

export default GameDetailPages