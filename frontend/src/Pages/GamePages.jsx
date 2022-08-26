import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import GameList from "../components/GameList";
import GameSearch from "../components/GameSearch";


function GamePages(props) {
    const {games, setCurrentGame} = props

    const [searchTitle, setSearchTitle] = useState(null)
    const [results, setResults] = useState([])

    function refresh(){
        window.location.reload()
    }
    
    return (
        <div className='gamePageBack'>
            <Container>
                <br/>
                <GameSearch setCurrentGame={setCurrentGame} setResults={setResults} results={results} searchTitle={searchTitle } setSearchTitle={setSearchTitle} />
                
                
                    
                
                {results.length > 0 ?
                    <div>
                        <br />
                    </div> :
                    
                        games.length > 0 ? <div>
                            <hr /> <h1><a type='button' onClick={refresh}>Hot Games</a></h1> <br></br>
                            <GameList games={games} setCurrentGame={setCurrentGame} /> </div> : <h1>Loading..</h1>
                    }
            </Container>
        </div>
    )
}


export default GamePages;
