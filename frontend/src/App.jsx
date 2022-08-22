import { useState } from 'react'
import AppNav from "./components/AppNav"

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
      <AppNav />
    </div>
  )
}

export default App
