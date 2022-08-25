import { Container, Row, Col } from "react-bootstrap/";
import GameTeaser from "./GameTeaser";

function GamePost(props){
    const {games, setCurrentGame} = props
    console.log(props)
    return (
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
            </Row>
       </div>
    )

}

export default GamePost;
