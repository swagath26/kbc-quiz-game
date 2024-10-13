import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerPage from './components/PlayerPage';
import MainScreen from './components/MainScreen';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/player" element={<PlayerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;