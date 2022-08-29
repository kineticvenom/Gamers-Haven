
import { Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useEffect } from "react"
import star from '../assets/star.png'
import emptyStar from '../assets/blackstar.png'
import axios from "axios"

function AnimeTeaser(props){
    const {setCurrentAnime, anime} = props

    // console.log('AnimeTeaser:',props)

    function grabCurrentAnime(){

        axios.post('/api/anime/details', {
            id: props.id
        })
        .then((response) => {
            setCurrentAnime(response.data)
        })
        window.location.href = `#/animes/${props.attributes.canonicalTitle}`
    }

    useEffect(() => {
        setCurrentAnime(null)
        sessionStorage.clear()
    }, [])

    return (
    <Col xs lg="4" xl='3' type='button' onClick={grabCurrentAnime} className="teaser-anime">
        <img width='200px' height='200px' src={props.attributes.posterImage.original} alt="" />
        <Link to={`/animes/${props.attributes.canonicalTitle}`} onClick={grabCurrentAnime}><h4>{props.attributes.canonicalTitle}</h4></Link>
        <h6>Episodes: {props.attributes.episodeCount}</h6>
        {[...Array(Math.round(props.attributes.averageRating / 100 * 5))].map(() => <img width='50px' height='50px' className="game-rating" src={star}></img>)}
        {Math.round(props.attributes.averageRating / 100 * 5) != 5 && [...Array(5 - Math.round(props.attributes.averageRating / 100 * 5))].map(() => <img width='50px' height='50px' className="game-rating" src={emptyStar}></img>)}
    </Col>
  );
}

export default AnimeTeaser;
