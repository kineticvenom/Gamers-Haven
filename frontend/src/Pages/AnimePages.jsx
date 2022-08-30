import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import AnimeList from "../components/AnimeList";
import AnimeSearch from "../components/AnimeSearch";

function AnimePages(props) {
    const {anime, setCurrentAnime} = props

    const [searchAnime, setSearchAnime] = useState(null)
    const [results, setResults] = useState([])

    function refresh(){
        window.location.reload()
    }

    return (

        <div className='anime-page'>

            <Container>
                <br/><br/><h1><a type='button' onClick={refresh}>Hot Anime</a></h1><br/><br/><br/>
                <AnimeSearch setCurrentAnime={setCurrentAnime} setResults={setResults} results={results} searchAnime={searchAnime} setSearchAnime={setSearchAnime} />
                
                
                    
                <br /><br />
                {results.length > 0 ?
                    <div>
                        <br /><br />
                    </div> :
                    
                        anime.length > 0 ? <div>
                            <br></br>
                            <AnimeList anime={anime} setCurrentAnime={setCurrentAnime} /> </div> : <h1>Loading..</h1>
                    }
            </Container>
        </div>
    )
}


export default AnimePages;