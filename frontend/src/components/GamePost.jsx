import { Row , Col } from "react-bootstrap/";
import axios from "axios"

import { useEffect, useState } from "react"
import GameComment from "./GameComment";
import CommentCard from "./CommentCard";

function GamePost(props){
    const [comments, setComments] = useState([])
    const [showForm,setShowForm] =useState(false)

    function grabComments() {
        axios.post('/comment/get', {

            'post_id': props.id

        }    
        ).then((response) => {
            setComments(response.data.comments)
        })
    }

    useEffect(()=>{
        grabComments()
      }, [])

    return (
        <div>
            <div className="post_box">   
                <h2>{props.title}</h2> 
                <hr />
                <Row>
                    <Col sm='2'>
                    <img src={props.user_image} height='100px' width='100px'></img> 
                    </Col>
                    <Col>
                        <h5>{props.content}</h5>
                        <p>Posted By :<span style={{ fontSize:'1.5rem'}}>{props.user_id}</span> </p>
                        <p>Posted On : {props.date}</p>

                    </Col>
                    <button onClick={() => { setShowForm(!showForm) }}>Reply</button>
                </Row>
            </div>
            {showForm ? <GameComment id ={props.id} api_id = {props.api_id} />: ''}
            {
            comments.map((comment) => (
            <CommentCard {...comment} /> 
        ))}<div className="py-2"></div>
       </div>
    )

}

export default GamePost;
