import { Form, Button } from 'react-bootstrap'
import axios from "axios"

function AnimePostForm(props) {
    const category = 'anime'
    const {currentAnime} = props
    function submitPost(event){
        event.preventDefault();
        axios.post('/post/create', {
            'game_title': currentAnime.title,
            'title': event.target[0].value,
            'content': event.target[1].value,
            'category': category,
            'id': currentAnime.id
        })
            .then((response) => {
                
                window.location.reload()
               
            })
        
    } 

    


    return (
        <Form className='post-border-anime' onSubmit={submitPost} style={{width:'1000px', margin:'auto'}}>
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

    )

}

export default  AnimePostForm

