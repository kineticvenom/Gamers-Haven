
import { useState,useEffect} from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import AppNav from "./components/AppNav"

import HomePage from './Pages/HomePage'
import AnimePages from './Pages/AnimePages'
import AnimeDetailPages from './Pages/AnimeDetailPages'
import GamePages from './Pages/GamePages'
import GameDetailPages from './Pages/GameDetailPages'


import "./App.css";


function App() {


  const [games, setGames] = useState([])
  const [currentGame, setCurrentGame] = useState(null)
  const [anime, setAnime] = useState([])
  const [currentAnime, setCurrentAnime] = useState(null)


  function GrabGame(){
      axios.get('/api/games')
      .then((response) => {
          console.log(response.data)
          console.log(response.data.results)
          setGames(response.data.results)
      })
  }

  useEffect(GrabGame, [])

  function GrabAnime(){
    axios.get('/api/anime')
    .then((response) => {
        console.log(response.data)
        console.log(response.data.data)
        setAnime(response.data.data)
    })
}

useEffect(GrabAnime, [])


  return (
    <div>
    < AppNav />
      <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/animes' element={< AnimePages anime={anime} setCurrentAnime={setCurrentAnime}/> }></Route>
            <Route path='/animes/:title' element={<AnimeDetailPages currentAnime={currentAnime}/>} />
            <Route path='/games' element={< GamePages games={games} setCurrentGame={setCurrentGame}/>}></Route>
            <Route path='/games/:title' element={<GameDetailPages currentGame={currentGame}/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
