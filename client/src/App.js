import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { GameView } from './components/App/GameView';
import SignIn from './components/App/SignIn'
import Lobby from './components/App/Lobby'

function App() {


  return (

      <Router>
        <div>
          
        <Routes>
          
          <Route path="/" element={<SignIn></SignIn>}/>
          <Route path='/game' element={<GameView></GameView>}/>
          <Route path='/lobby' element={<Lobby></Lobby>}/>
        </Routes>
        </div>
      </Router>
  );
}

export default App;
