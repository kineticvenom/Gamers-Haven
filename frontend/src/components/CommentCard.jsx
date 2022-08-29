import {  Row, Col } from "react-bootstrap/";
import axios from "axios"


function CommentCard(props){
    const { user } = props
   
    function deleteComment() { 
        axios.delete('/comment/delete', { data: 
            { 
                comment_id: props.id,
                user: props.user_id 
            }}    
        ).then((response) => {
            console.log(response)
            window.location.reload()
        })
    }
    return (
            <div className="comment_box"> 
                
                    
               {user && user.username == props.user_id  && 
                        <button className="delete_button_comment" onClick={() => { deleteComment() }}>X</button>  
                    }
                
                <Row>
                    <Col sm='2'>
                    <img src={props.user_image} height='100px' width='100px'></img> 
                    </Col>
                    <Col>
                        <h5>{props.content}</h5>
                        <p>Posted By :<span style={{ fontSize:'1.5rem'}}>{props.user_id}</span> </p>
                        <p>Posted On : {props.date}</p>

                </Col>
                    
                </Row>
       </div>
    )

}

export default CommentCard;
