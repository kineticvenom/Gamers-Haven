import {useState, useEffect} from 'react'
import axios from 'axios'
import PollsForm from '../components/PollsForm'

function PollsPages(props) {
    
    return (
        <div>
            <h1>Polls!</h1>
            <PollsForm/>
         </div>
    )
}

export default PollsPages