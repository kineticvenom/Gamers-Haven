import { Col } from "react-bootstrap"

import star from '../assets/star.png'


function GameTeaser(props){
    const {game} = props 



    return (
    <Col>
        <h1>{game.name}</h1>
        <img src={game.image} alt="" />
        <br />
        {[...Array(game.rating_top)].map(() => <img width='60px' height='60px' className="game-rating" src={star}></img>)}

        
        
    </Col>
    )
}

export default GameTeaser