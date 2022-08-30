import { Row , Col } from "react-bootstrap/";
import {  Button } from 'react-bootstrap'
import axios from "axios"
import { useEffect, useState } from "react"
import GameCommentForm from "./GameCommentForm";
import GameCommentCard from "./GameCommentCard";

function GamePost(props){
    const {user} = props
    const [comments, setComments] = useState([])
    const [showForm,setShowForm] =useState(false)
    const [showComments, setShowComments] = useState(false)
    
    
    function deletePost() { 
        axios.delete('/post/delete', { data: { 
            post_id: props.id,
            user: props.user.username 
        } }    
        ).then((response) => {
            console.log(response)
            window.location.reload()
        })
    }
     

    function grabComments() {
        axios.get('/comment/get', { params: { post_id: props.id } }    
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
                <strong>{props.game_title}</strong><h2> <span style={{display: 'flex', justifyContent: 'center'}}>{props.title}</span></h2> 
            
                {user && user.username == props.user.username  && 
                <button className="delete_button_post" onClick={() => { deletePost() }}>X</button> }
                <hr />
                <Row>
                    <Col sm='2'>
                    <img src={props.user_image} height='100px' width='100px'></img> 
                    </Col>
                    <Col>
                        <h5>{props.content}</h5>
                        <p>Posted By :<span style={{ fontSize:'1.2rem'}}> {props.user.username}</span> </p>
                        <p>Posted On : {props.date_posted}</p>

                    </Col>
                    <Button onClick={() => { setShowForm(!showForm) }}>Reply</Button>
                    <hr />
                    {comments.length>0 &&
                        <Button onClick={() => { setShowComments(!showComments) }}>View Replies</Button>
                    }
                    
                    
                </Row>
            </div>
            {showForm ? <GameCommentForm id={props.id} api_id={props.api_id}  />: ''}
            {showComments ?
            comments.map((comment) => (
            <GameCommentCard {...comment} user={user}/> 
        )):<></>}<div className="py-2"></div>
       </div>
    )

}

export default GamePost;
