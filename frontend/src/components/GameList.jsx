import {Row} from "react-bootstrap/";
import GameTeaser from "./GameTeaser";

function GameList(props){
    const {games, setCurrentGame} = props

    return (
        <Row>
            {games.map((game) => (
                <GameTeaser {...game} setCurrentGame={setCurrentGame}/>
                ))
            }
           
        </Row>
    )

}

export default GameList;
