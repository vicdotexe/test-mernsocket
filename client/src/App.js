import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatBox from './components/Chat/ChatBox';
import SignInForm from './components/SignInForm';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignIn from './views/SignIn'
import Lobby from './views/Lobby';
function App() {


  return (

      <Router>
        <div>
          <div>Test</div>
        <Routes>
          <Route path="/" element={<SignIn></SignIn>}/>
          <Route path='/lobby' element={<Lobby></Lobby>}/>
        </Routes>
        </div>
      </Router>
  );
}

export default App;
