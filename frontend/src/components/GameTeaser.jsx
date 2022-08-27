
import { Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useEffect } from "react"
import star from '../assets/star.png'
import emptyStar from '../assets/blackstar.png'
import axios from "axios"

function GameTeaser(props){
    const {setCurrentGame, games} = props

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
        sessionStorage.clear()
    }, [])



    return (
    <Col xs lg="4" xl='3' className="teaser">
        <img width='200px' height='200px' src={props.background_image} alt="" />
        <Link to={`/games/${props.name}`} onClick={grabCurrentGame}><h4>{props.name}</h4></Link>
        {[...Array(props.rating_top)].map(() => <img width='50px' height='50px' className="game-rating" src={star}></img>)}
        {props.rating_top != 5 && [...Array(5 - props.rating_top)].map(() => <img width='50px' height='50px' className="game-rating" src={emptyStar}></img>)}

        
        

    </Col>
  );
}

export default GameTeaser;
