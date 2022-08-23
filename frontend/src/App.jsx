import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import HomePage from "./Pages/HomePage";
import AnimePages from "./Pages/AnimePages";
import GamePages from "./Pages/GamePages";

import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/animes" element={<AnimePages />}></Route>
          <Route path="/games" element={<GamePages />}></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
