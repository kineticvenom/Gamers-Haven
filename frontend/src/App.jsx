import { useState } from 'react'
import AppNav from "./components/AppNav"
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AnimePages from './Pages/AnimePages'
import GamePages from './Pages/GamePages'

import './App.css'

function App() {


  return (
    <div className="">
      <AppNav />
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/animes' element={< AnimePages /> }></Route>
          <Route path='/games' element={< GamePages />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
