import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import GameList from "../components/GameList";


function GamePages(props) {
    const {games, setCurrentGame} = props

    return (
        <div>
            <Container>
                {games.length > 0 ? <GameList games={games} setCurrentGame={setCurrentGame}/> : <p>loading</p>}
            </Container>
        </div>
    )
}


export default GamePages;
