import {useState, useEffect} from 'react'
import axios from 'axios'
import PollForm from '../components/PollForm'
import PollCard from '../components/PollCard'
import {Button, Container, Row} from "react-bootstrap/";

function PollsPages(props) {
    const {user} = props
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
        <div className='poll_page'>
            <Container>
            <h1 style={{ padding: '50px' }}>Polls</h1>
            <Button style={{ margin: '20px', padding: '22px',
    width: '250px' }} onClick={() => { setShowForm(!showForm) }}>Create New Poll</Button>
                        {showForm ? <PollForm />: ''}
            {polls ?
                <div className='PollBox'>
                    <div className="PollRow">
                        <Row >
                        {polls.map((poll) => (
                            <PollCard {...poll} user={user}/>
                        ))}
                    
                        </Row>
                    </div>
                    
                </div>
                : <h3>Loading Polls..</h3>

            }
            </Container>
         </div>
    )
}

export default PollsPages