import { Container, Row, Col } from "react-bootstrap/";
import GameTeaser from "./GameTeaser";

function GameList(props) {
  const { game } = props;

  return <Row>{game ? <GameTeaser game={game} /> : <h1>Loading..</h1>}</Row>;
}

export default GameList;
