import {useState, useEffect} from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router'
import GamePost from '../components/GamePost'
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
            'id': currentGame.id
        }    
        ).then((response) => {
            
            setPosts(response.data.posts)
            console.log(response.data.posts)
            
        })
    }

    
    
    
    
    return (
        <div>
            
                {
                currentGame ?
                    <div>
                        <button>Add Favorite</button>
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