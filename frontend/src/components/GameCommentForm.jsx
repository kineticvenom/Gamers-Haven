import { useEffect } from "react"
import { Form, Button } from 'react-bootstrap'
import axios from "axios"

function GameCommentForm(props) {
    const { id, api_id } = props
    
    function deletePost() { 
        axios.post('/comment/delete', {

            'post_id': props.id,
            'user': props.user_id


        }    
        ).then((response) => {
            console.log(response)
            window.location.reload()
        })
    }
    
    function submitComment(event){
        event.preventDefault();
        console.log('new comment: ' + event.target[0].value);
        axios.post('/comment/create', {
            'content': event.target[0].value,
            'post_id': id,
            'api_id':api_id,

        })
            .then((response) => {
                
                console.log('response from server: ', response)
                window.location.reload()
               
            })
        
    } 

    


    return (
            <Form onSubmit={submitComment} style={{width:'1000px', margin:'auto'}}>

                <Form.Group className="mb-3" controlId="formContent">
                <Form.Label>Comment</Form.Label>
                <Form.Control as='textarea' rows={3} type="text" placeholder="Write your comment here.." />
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>

    )

}

export default GameCommentForm



                       