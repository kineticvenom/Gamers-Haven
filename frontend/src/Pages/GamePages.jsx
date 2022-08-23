import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import GameList from "../components/GameList";


function GamePages({ games }) {


    return (
        <div>
            <Container>
                {games.length > 0 ? <GameList games={games} /> : <p>loading</p>}
            </Container>
        </div>
    )
}


export default GamePages;
