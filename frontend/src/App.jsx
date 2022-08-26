
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
import SignUpPage from './Pages/SignUpPage'
import LogInPage from './Pages/LogInPage'


const getCSRFToken = ()=>{
  let csrfToken

  // the browser's cookies for this page are all in one string, separated by semi-colons
  const cookies = document.cookie.split(';')
  for ( let cookie of cookies ) {
      // individual cookies have their key and value separated by an equal sign
      const crumbs = cookie.split('=')
      if ( crumbs[0].trim() === 'csrftoken') {
          csrfToken = crumbs[1]
      }
  }
  return csrfToken
}

axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken()



function App() {


  const [games, setGames] = useState([])
  const [currentGame, setCurrentGame] = useState(null)
  const [anime, setAnime] = useState([])
  const [currentAnime, setCurrentAnime] = useState(null)
  const [saveData, setSaveData] = useState(null)
  
  const [user, setUser] = useState(null)

  const whoAmI = async () => {
    const response = await axios.get('/whoami')
    const user = response.data && response.data[0] && response.data[0].fields
    console.log('hello', user)
    // console.log('user from whoami? ', user)
    // console.log('-------THIS IS THE RESPOSNE-----', response)
    setUser(user)
  }

  useEffect(()=>{
    whoAmI()
  }, [])


  function GrabGame(){
      axios.get('/api/games')
      .then((response) => {
          // console.log(response.data)
          // console.log(response.data.results)
          setGames(response.data.results)
      })
  }

  useEffect(GrabGame, [])

  function GrabAnime(){
    axios.get('/api/anime')
    .then((response) => {
        // console.log(response.data)
        // console.log(response.data.data)
        setAnime(response.data.data)
    })
}

useEffect(GrabAnime, [])



  return (
    <div>
    < AppNav user={user}/>
      <Router>
          <Routes>
            <Route path='/' element={<HomePage user={user} saveData={saveData} setSaveData={setSaveData}/>} />
            <Route path='/animes' element={< AnimePages anime={anime} setCurrentAnime={setCurrentAnime}/> }></Route>
            <Route path='/animes/:title' element={<AnimeDetailPages currentAnime={currentAnime} setCurrentAnime={setCurrentAnime}/>} />
            <Route path='/games' element={< GamePages games={games} setCurrentGame={setCurrentGame}/>}></Route>
            <Route path='/games/:game_ID' element={<GameDetailPages currentGame={currentGame} setCurrentGame={setCurrentGame}/>} />
            <Route path='/signup' element={<SignUpPage />}></Route>
            <Route path='/login' element={<LogInPage />}></Route>
          
          </Routes>
      </Router>
    </div>
  );
}

export default App;
