
import { Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
import star from '../assets/star.png'
import emptyStar from '../assets/blackstar.png'

function GameTeaser(props){
    
    console.log('GameTeaser:',props)


    return (
    <Col xs lg="4" xl='3'>
        <Link to={`/games/${props.name}`}><h1>{props.name}</h1></Link>
        <img width='200px' height='200px' src={props.background_image} alt="" />
        <br />
        {[...Array(props.rating_top)].map(() => <img width='60px' height='60px' className="game-rating" src={star}></img>)}
        {props.rating_top != 5 && [...Array(5 - props.rating_top)].map(() => <img width='60px' height='60px' className="game-rating" src={emptyStar}></img>)}

        
        

    </Col>
  );
}

export default GameTeaser;
