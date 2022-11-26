import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { GameView } from './components/App/GameView';
import SignIn from './views/SignIn'
import Lobby from './views/Lobby'

function App() {


  return (

      <Router>
        <div>
          
        <Routes>
          <Route path='/' element={<GameView></GameView>}/>
          <Route path="/signin" element={<SignIn></SignIn>}/>
          <Route path='/lobby' element={<Lobby></Lobby>}/>
        </Routes>
        </div>
      </Router>
  );
}

export default App;
