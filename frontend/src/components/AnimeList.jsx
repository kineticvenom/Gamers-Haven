import { Container, Row, Col } from "react-bootstrap/";
import AnimeTeaser from "./AnimeTeaser";

function AnimeList(props){
    const {anime, setCurrentAnime} = props

    return (
        <Row>
            {anime.map((show) => (
                <AnimeTeaser {...show} setCurrentAnime={setCurrentAnime}/>
                ))
            }
           
        </Row>
    )

}

export default AnimeList;