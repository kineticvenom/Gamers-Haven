import {useState, useEffect} from 'react'
import Container from 'react-bootstrap/esm/Container'
import axios from 'axios'
import GameList from '../components/GameList'

function GameDetailPages(props){
    const {currentGame} = props
    
    console.log(currentGame)
  
    return (
        <div>
            {currentGame ?
            <div>
                <h1>{currentGame.name}</h1>
                <img width='300px' height='300px' src={currentGame.background_image} alt='reload'></img>
                <h5>{currentGame.description_raw}</h5>
            </div> : <h1>Loading..</h1>
            }
         </div>
    )
}

export default GameDetailPages