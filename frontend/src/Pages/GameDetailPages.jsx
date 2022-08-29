import {useState, useEffect} from 'react'
import axios from 'axios'
import GamePostList from '../components/GamePostList'
import GamePostForm from '../components/GamePostForm'
import { Button } from 'react-bootstrap'
import GamePost from '../components/GamePost'


function GameDetailPages(props) {
    const category = 'game'

    const {currentGame, setCurrentGame, user} = props
    
    const [posts, setPosts] = useState([])
    const [showForm,setShowForm] =useState(false)


    useEffect(() => {
        setCurrentGame(JSON.parse(window.sessionStorage.getItem("currentGame")));
      }, []);
    
      useEffect(() => {
        window.sessionStorage.setItem("currentGame", JSON.stringify(currentGame));
      }, [currentGame]);


      


    function grabPosts() {
        axios.get('/post/get', { params: 
            { 
                id: currentGame.id,
                category: category 
            }}    
        ).then((response) => {
            
            setPosts(response.data.posts)
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
                    <div className='details'>
                        <div className='details-card-game'>
                            <h1>{currentGame.name}</h1>
                            <img width='300px' height='300px' src={currentGame.background_image} alt='reload'></img>
                            <h3>Genre: {currentGame.genres[0].name}</h3>
                            <Button onClick={addFavorite}>Add Favorite</Button> 
                        </div>
                            { currentGame.esrb_rating != null ?
                                <p className='details-info'>{currentGame.description_raw} <br /><br /> <h5>Rated: {currentGame.esrb_rating.name}</h5> <h5>Developed By: {currentGame.developers[0].name}</h5> <h5>Released: {currentGame.released}</h5> <h5>Review Score: {currentGame.metacritic}</h5></p>
                                :
                                <p className='details-info'>{currentGame.description_raw} <br /><br /> <h5>Not Rated</h5> <h5>Developed By: {currentGame.developers[0].name}</h5> <h5>Released: {currentGame.released}</h5> <h5>Review Score: {currentGame.metacritic}</h5></p>
                            }
                    </div>
                    <div>
                        <h1 >Discussions</h1>
                        <Button onClick={() => { setShowForm(!showForm) }}>New Post</Button>
                        {showForm ? <GamePostForm currentGame={currentGame} />: ''}
                        {currentGame ? <GamePostList posts={posts} grabPosts={grabPosts} user={user}/> : <h4>Loading posts..</h4>}
                    </div>   

                </div> : <h1>Loading..</h1>
                } 
        </div>
    )

}

export default GameDetailPages