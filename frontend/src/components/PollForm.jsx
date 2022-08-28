import { Form, Button } from 'react-bootstrap'
import axios from "axios"

function PollForm() {

    
    function submitPost(event) {
        event.preventDefault();
        console.log('new poll: ' + event.target[0].value, event.target[1].value, event.target[2].value);
        axios.post('/poll/create', {
            'title': event.target[0].value,
            'option1': event.target[1].value,
            'option2': event.target[2].value,
            'option3': event.target[3].value,
            'option4': event.target[4].value,
            'option5': event.target[5].value
        })
            .then((response) => {
                
                console.log('response from server: ', response)
                window.location.reload()
               
            })
        
    }

    


    return (
        <Form onSubmit={submitPost} style={{ width: '1000px', margin: 'auto' }}>
            <Form.Group className="mb-3" controlId="formTitle" >
         
                <Form.Control type="text" placeholder="Title" />
            </Form.Group>
            <br/>
            <Form.Group className="mb-2" controlId="formContent">
                <Form.Control maxlength="20" as='textarea' rows={1}  type="text" placeholder="option1 (Required)" />
            </Form.Group>            
            <Form.Group className="mb-2" controlId="formContent">             
                <Form.Control maxlength="20" as='textarea' rows={1} type="text" placeholder="option2 (Required)" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formContent">             
                <Form.Control maxlength="20" as='textarea' rows={1}  type="text" placeholder="option3" />
            </Form.Group>          
            <Form.Group className="mb-2" controlId="formContent">         
                <Form.Control maxlength="20" as='textarea' rows={1} type="text" placeholder="option4" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formContent">        
                <Form.Control maxlength="20" as='textarea' rows={1} type="text" placeholder="option5" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

    )
}
    export default PollForm