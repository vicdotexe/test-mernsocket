import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { GameView } from './components/App/GameView';

function App() {


  return (

      <Router>
        <div>
          <GameView/>
        {/* <Routes>
          <Route path="/" element={<SignIn></SignIn>}/>
          <Route path='/lobby' element={<Lobby></Lobby>}/>
        </Routes> */}
        </div>
      </Router>
  );
}

export default App;
