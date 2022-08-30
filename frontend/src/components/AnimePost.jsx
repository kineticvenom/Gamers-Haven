import { Row , Col } from "react-bootstrap/";
import axios from "axios"
import {  Button } from 'react-bootstrap'
import { useEffect, useState } from "react"
import AnimeCommentForm from "./AnimeCommentForm";
import AnimeCommentCard from "./AnimeCommentCard";

function AnimePost(props) {
    const {user, setCurrentAnime, currentAnime} = props
    const [comments, setComments] = useState([])
    const [showForm,setShowForm] =useState(false)
    const [showComments, setShowComments] = useState(false)
    

    function grabCurrentAnime(){

        axios.post('/api/anime/details', {
            id: props.api_id
        })
        .then((response) => {
            setCurrentAnime(response.data)
            window.sessionStorage.setItem("currentAnime", JSON.stringify(currentAnime))
        })
        window.location.href=`/#/animes/${props.game_title}`
    }

    function deletePost() { 
        axios.delete('/post/delete', { data: { 
            post_id: props.id,
            user: props.user.username 
        } }    
        ).then((response) => {
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
            <div className="post_box_anime"> 
                
            <strong><a type='button' onClick={grabCurrentAnime}>{props.game_title}</a></strong><h2> <span style={{display: 'flex', justifyContent: 'center'}}>{props.title}</span></h2>  
            
            {user && (props.user_id ? user.username == props.user_id : user.username == props.user.username) && 
            <button className="delete_button_post" onClick={() => { deletePost() }}>X</button> }
                <hr />
                <Row>
                    <Col sm='2'>
                    <img src={props.user_image} height='100px' width='100px'></img> 
                    </Col>
                    <Col>
                        <h5>{props.content}</h5>
                        <p>Posted By :<span style={{ fontSize:'1.5rem'}}>{props.user_id||props.user.username }</span> </p>
                        <p>Posted On : {props.date_posted}</p>

                    </Col>
                    <Button onClick={() => { setShowForm(!showForm) }}>Reply</Button>
                    <hr />
                    {comments.length>0 &&
                        <Button onClick={() => { setShowComments(!showComments) }}>View Replies</Button>
                    }
                    
                    
                </Row>
            </div>
            {showForm ? <AnimeCommentForm id={props.id} api_id={props.api_id}  />: ''}
            {showComments ?
            comments.map((comment) => (
            <AnimeCommentCard {...comment} user={user}/> 
        )):<></>}<div className="py-2"></div>
       </div>
    )

}

export default AnimePost;
