import { Form, Button } from 'react-bootstrap'
import axios from "axios"

function EventForm() {

    function submitEvent(event) {
        event.preventDefault();
        console.log('new event ');
        axios.post('/event/create', {
            'activity': event.target[0].value,
            'title': event.target[1].value,
            'start': event.target[2].value,
            'end': event.target[3].value,
            'where': event.target[4].value,
            'related_links': event.target[5].value,
            'host_contact': event.target[6].value
        })
            .then((response) => {
                
                console.log('response from server: ', response)
                if (response.data.Success == true) {
                    window.location.reload()
                }
               
            })
        
    }


    return (
        <div>
            <Form onSubmit={submitEvent} style={{ width: '1000px', margin: 'auto' }}>
                <Form.Group className="mb-3" controlId="formTitle" >
                <Form.Label>Event Type? (required)</Form.Label>
                <Form.Select aria-label="Activity ">
                    <option value="Videogame Convention">Gaming Convention</option>
                    <option value="Anime Convention">Anime Convention</option>
                    <option value="Gaming Session">Gaming Session</option>
                    <option value="Anime Watching Party">Anime Watching Party</option>
                    <option value="Activity">Other Activity...</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTitle" >
                    <Form.Label>Event Title? (required)</Form.Label>
                    <Form.Control type="text" placeholder="Title.." />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formStart">
                    <Form.Label>Event Start Date/Time? (required)</Form.Label>
                    <input className="form-control" type="datetime-local" id="meeting-time"
                    min="2022-08-28T00:00" max="2022-12-30T00:00"></input>
                </Form.Group>            
                <Form.Group className="mb-2" controlId="formEnd">
                    <Form.Label>Event End Date/Time? (optional)</Form.Label>
                    <input  className="form-control" type="datetime-local" id="meeting-time"
                    min="2022-08-28T00:00" max="2022-12-30T00:00"></input>
                </Form.Group>  
                <Form.Group className="mb-3" controlId="formLocation" >
                    <Form.Label>Event Location (required)</Form.Label>
                    <Form.Control type="text" placeholder="Physical location, gaming platform, discord, etc.." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLinks" >
                    <Form.Label>Links (optional)</Form.Label>
                    <Form.Control type="text" placeholder="Related links.." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContact" >
                    <Form.Label>Host Contact Information (required)</Form.Label>
                    <Form.Control type="text" placeholder="Email, Phone #, Gamertag, PS Name, etc.." />
                </Form.Group>                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
       </div>

    )
}
    export default EventForm