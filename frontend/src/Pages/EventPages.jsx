import {useState, useEffect} from 'react'
import axios from 'axios'
import {Button, Row} from "react-bootstrap/";
import EventForm from '../components/EventForm';
import EventCard from '../components/EventCard';

function EventPages(props) {
    const { user } = props
    
    const [showForm,setShowForm] =useState(false)
    const [events, setEvents] = useState(null)

    
    function GrabEvents(){
        axios.get('/event/get')
        .then((response) => {
            setEvents(response.data.events)
        })
    }
    
    useEffect(GrabEvents, [])
    
    return (
        <div className='event-page'>
            
            <h1 style={{ padding: '50px' }}>Events</h1>
            <Button style={{ margin: '20px', padding: '22px',width: '250px' }} onClick={() => { setShowForm(!showForm) }}>Create New Event</Button>
            {showForm ? <EventForm /> : ''}    
            {events ?
                <div>
                    {events.map((event) => (<EventCard {...event} user={user} />
                    ))}
                </div>
                : <h3>Loading Events..</h3>

            }
        </div>
        
    )
}

export default EventPages