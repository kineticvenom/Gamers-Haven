import {useState, useEffect} from 'react'
import Container from 'react-bootstrap/esm/Container'
import axios from 'axios'
import AnimeList from '../components/AnimeList'

function AnimeDetailPages(props){
    const {currentAnime} = props
    
  
    return (
        <div>
            {currentAnime ?
            <div>
                <h1>{currentAnime.title}</h1>
                <img width='300px' height='300px' src={currentAnime.image} alt='reload'></img>
                <h5>{currentAnime.description}</h5>
            </div> : <h1>Loading..</h1>
            } 
         </div>
    )
}

export default AnimeDetailPages