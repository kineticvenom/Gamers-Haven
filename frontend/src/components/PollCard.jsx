import axios from "axios"
import { Col } from "react-bootstrap"
import { useEffect, useState } from "react"

function PollCard(props) {

    const [results, setResults] = useState(null)
    const [showForm,setShowForm] =useState(true)

    function updatePoll(event) {
        event.preventDefault();
        const choice = event.target.value
        axios.put('/poll/update', {
           'poll_id': props.id,
           'option': choice
    }).then((response) => {
        console.log(response.data)
        setResults(response.data.data)
        setShowForm(false)
        
        props[choice] += 1
        
        
     
    })
}

    return (
        <Col lg='5' className="pollcard">
            <h3>{props.title}</h3>
            <hr/>
            <div className="pollButtonBox">
                {showForm ? <button onClick={updatePoll} value='votes1'>{props.option1}</button>:<button className="buttonResults">{`${props.option1}\t:\t${props.votes1}`} </button>} <br/>
                {showForm ? <button onClick={updatePoll} value='votes2'>{props.option2}</button>:<button className="buttonResults">{`${props.option2}\t:\t${props.votes2}`}</button>} <br/>
                {props.option3 ? <span> {showForm ? <button onClick={updatePoll} value='votes3'>{props.option3}</button> : <button className="buttonResults" >{`${props.option3}  :   ${props.votes3}`}</button>} <br/></span> : ''}
                {props.option4 ?<span>  {showForm ?<button onClick={updatePoll} value='votes4'>{props.option4}</button>: <button className="buttonResults" >{`${props.option4}        ${props.votes4}`}</button>} <br/></span> : ''}
                {props.option5 ? <span>  {showForm ?<button onClick={updatePoll} value='votes5'>{props.option5}</button>: <button className="buttonResults">{`${props.option5}       ${props.votes5}`}</button>} <br/></span>: ''}
            </div>
        
        </Col>
    )
}
    export default PollCard