import { Container, Row, Col } from "react-bootstrap/";
import GameTeaser from "./GameTeaser";

function GameList(props){
    const {games} = props

    return (
        <Row>
            {games.map((game) => (
                <GameTeaser {...game}/>
                ))
            }
           
        </Row>
    )

}

export default GameList;
