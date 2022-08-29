import { Row , Col } from "react-bootstrap/";
import { Form, Button } from 'react-bootstrap'
import axios from "axios"

import { useEffect, useState } from "react"
import GameCommentForm from "./GameCommentForm";
import CommentCard from "./CommentCard";

function GamePost(props){
    const [comments, setComments] = useState([])
    const [showForm,setShowForm] =useState(false)
    const [showComments, setShowComments] = useState(false)
    const [user, setUser] = useState(null)

    const whoAmI = async () => {
    const response = await axios.get('/whoami')
    const user = response.data && response.data[0] && response.data[0].fields
    setUser(user)
    }

    useEffect(()=>{
    whoAmI()
    }, [])

    
    function deletePost() { 
        axios.delete('/post/delete', { data: { 
            post_id: props.id,
            user: props.user_id 
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
                <h2>{props.title}</h2> 
            
                        {user && user.username == props.user_id  && 
                        <button className="delete_button_post" onClick={() => { deletePost() }}>X</button>  
                    }
                <hr />
                <Row>
                    <Col sm='2'>
                    <img src={props.user_image} height='100px' width='100px'></img> 
                    </Col>
                    <Col>
                        <h5>{props.content}</h5>
                        <p>Posted By :<span style={{ fontSize:'1.2rem'}}> {props.user_id}</span> </p>
                        <p>Posted On : {props.date}</p>

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
            <CommentCard {...comment} user={user}/> 
        )):<></>}<div className="py-2"></div>
       </div>
    )

}

export default GamePost;
