import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import GameList from "../components/GameList";

function GamePages() {
  const [game, setGame] = useState(null);

  function GrabGame() {
    axios.get("/api/games").then((response) => {
      setGame(response.data);
      console.log(response);
    });
  }

  useEffect(GrabGame, []);

  return (
    <div>
      <Container>
        <GameList game={game} />
      </Container>
    </div>
  );
}

export default GamePages;
