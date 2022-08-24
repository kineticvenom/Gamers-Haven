
import { Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useEffect } from "react"
import star from '../assets/star.png'
import emptyStar from '../assets/blackstar.png'
import axios from "axios"

function GameTeaser(props){
    const {setCurrentGame, games} = props
    
    console.log('GameTeaser:',props)

    function grabCurrentGame(){

        axios.post('/api/game/details', {
            id: props.id
        })
        .then((response) => {
            setCurrentGame(response.data)
        })

    }

    useEffect(() => {
        setCurrentGame(null)
    }, [])



    return (
    <Col xs lg="4" xl='3'>
        <img width='200px' height='200px' src={props.background_image} alt="" />
        <Link to={`/games/${props.name}`} onClick={grabCurrentGame}><h1>{props.name}</h1></Link>
        <br />
        {[...Array(props.rating_top)].map(() => <img width='60px' height='60px' className="game-rating" src={star}></img>)}
        {props.rating_top != 5 && [...Array(5 - props.rating_top)].map(() => <img width='60px' height='60px' className="game-rating" src={emptyStar}></img>)}

        
        

    </Col>
  );
}

export default GameTeaser;
