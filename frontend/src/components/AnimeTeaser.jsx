
import { Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useEffect } from "react"
import star from '../assets/star.png'
import emptyStar from '../assets/blackstar.png'
import axios from "axios"

function AnimeTeaser(props){
    const {setCurrentAnime, anime} = props

    function grabCurrentAnime(){

        axios.post('/api/anime/details', {
            id: props.id
        })
        .then((response) => {
            setCurrentAnime(response.data)
        })

    }

    useEffect(() => {
        setCurrentAnime(null)
    }, [])

    return (
    <Col xs lg="4" xl='3'>
        <img width='200px' height='200px' src={props.attributes.posterImage.original} alt="" />
        <Link to={`/animes/${props.attributes.canonicalTitle}`} onClick={grabCurrentAnime}><h1>{props.attributes.canonicalTitle}</h1></Link>
        {[...Array(Math.round(props.attributes.averageRating / 100 * 5))].map(() => <img width='60px' height='60px' className="game-rating" src={star}></img>)}
        {Math.round(props.attributes.averageRating / 100 * 5) != 5 && [...Array(5 - Math.round(props.attributes.averageRating / 100 * 5))].map(() => <img width='60px' height='60px' className="game-rating" src={emptyStar}></img>)}
    </Col>
  );
}

export default AnimeTeaser;
