import { Form, Button } from 'react-bootstrap'
import axios from "axios"

function PollsForm() {

    
    function submitPost(event) {
        event.preventDefault();
        console.log('new poll: ' + event.target[0].value, event.target[1].value, event.target[2].value);
        axios.post('/poll/create', {
            'title': event.target[0].value,
            'option1': event.target[1].value,
            'option2': event.target[2].value
    
        })
            .then((response) => {
                
                console.log('response from server: ', response)
               
            })
        
    }

    


    return (
        <Form onSubmit={submitPost} style={{ width: '1000px', margin: 'auto' }}>
            <Form.Group className="mb-3" controlId="formTitle" >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" />
            </Form.Group>
            <br/><br/><br/>
            <Form.Group className="mb-3" controlId="formContent">
                <Form.Label>Option 1</Form.Label>
                <Form.Control maxlength="20" as='textarea' rows={1}  type="text" placeholder="option1" />
            </Form.Group>
            <br/>
            <Form.Group className="mb-3" controlId="formContent">
                <Form.Label>Option 2</Form.Label>
                <Form.Control maxlength="20" as='textarea' rows={1} type="text" placeholder="option2" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

    )
}
    export default PollsForm