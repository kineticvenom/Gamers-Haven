import {useState, useEffect} from 'react'
import axios from 'axios'
import PollForm from '../components/PollForm'
import PollCard from '../components/PollCard'
import {Button, Row} from "react-bootstrap/";

function PollsPages(props) {
    
    const [polls, setPolls] = useState(null)
    const [showForm,setShowForm] =useState(false)
    
    function GrabPolls(){
        axios.get('/poll/get')
        .then((response) => {
            console.log(response.data.polls)
            setPolls(response.data.polls)
            
         
        })
    }
    
    useEffect(GrabPolls, [])
    
    return (
        <div>
            <h1 style={{ padding: '50px' }}>Polls!</h1>
            <Button style={{ margin: '70px', padding: '22px',
    width: '250px' }} onClick={() => { setShowForm(!showForm) }}>Create New Poll</Button>
                        {showForm ? <PollForm />: ''}
            {polls ?
                <div className='PollBox'>
                    <div className="PollRow">
                        <Row >
                        {polls.map((poll) => (
                            <PollCard {...poll} />
                        ))}
                    
                        </Row>
                    </div>
                    
                </div>
                : <h3>Loading Polls..</h3>

            }
            
         </div>
    )
}

export default PollsPages