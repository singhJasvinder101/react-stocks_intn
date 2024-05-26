import React from 'react';
import GlobalStyles from './components/GlobalStyles';
import Home from './pages/Home';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSign from './pages/LoginSign';

function App() {

  return (
    <>
      <div className="App">
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/login" element={<LoginSign />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
