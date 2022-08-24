import {useState, useEffect} from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router'

function GameDetailPages(props) {
    let { game_ID } = useParams()

    const {currentGame} = props
    
    const category = 'game'
    const [posts, setPosts] = useState([])
    

    function grabPosts() {
        axios.post('/post/get', {
            'id': game_ID
        }    
        ).then((response) => {
            
            setPosts(response.data.posts)
            console.log(response.data.posts)
            
        })
    }
    
    useEffect(()=>{
            grabPosts()
          }, [])

    
    
        
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
               
            })
        
    } 

    return (
        <div>
            <div>
                {
                currentGame ?
                <div>
                    <h1>{currentGame.name}</h1>
                    <img width='300px' height='300px' src={currentGame.background_image} alt='reload'></img>
                    <h5>{currentGame.description_raw}</h5>
                </div> : <h1>Loading..</h1>
                }
            </div>
            <div>
                <div>
                    <div>
                        <h1>Discussions:</h1>

                    </div> 
                
                    
                    <br/><br/><br/>
                </div>
                <div>
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
                </div>

            </div>

         </div>
    )
}

export default GameDetailPages