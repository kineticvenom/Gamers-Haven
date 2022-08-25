import {useState, useEffect} from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router'
import GamePost from '../components/GamePost'
import GamePostList from '../components/GamePostList'


function GameDetailPages(props) {

    const {currentGame, setCurrentGame} = props
    
    const category = 'game'
    const [posts, setPosts] = useState([])


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
    
    
    
        
    function submitPost(event){
        event.preventDefault();
        console.log('new post: ' + event.target[0].value, event.target[1].value);
        axios.post('/post/create', {
            'title': event.target[0].value,
            'content': event.target[1].value,
            'category': category,
            'id': currentGame.id
        })
            .then((response) => {
                
                console.log('response from server: ', response)
                window.location.reload()
               
            })
        
    } 

    return (
            <div>
                {
                currentGame ?
                <div>
                    <h1>{currentGame.name}</h1>
                    <img width='300px' height='300px' src={currentGame.background_image} alt='reload'></img>
                    <h5>{currentGame.description_raw}</h5>
                    <div className="py-3"></div>
                    <div>
                        <h1>Discussions:</h1>
                        {currentGame ? <GamePostList posts={posts} grabPosts={grabPosts}/> : <h4>Loading posts..</h4>
                        }
                    </div>   
                    <div className="py-2"></div>
                    <Form onSubmit={submitPost}>
                        <Form.Group className="mb-3" controlId="formTitle" >
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formContent">
                        <Form.Label>Content of Post</Form.Label>
                        <Form.Control as='textarea' rows={3} type="text" placeholder="Content" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                        Submit
                        </Button>
                    </Form>
                </div> : <h1>Loading..</h1>
                }
            </div>
    )

}

export default GameDetailPages