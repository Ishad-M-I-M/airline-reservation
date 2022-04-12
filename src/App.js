import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import './App.css';
import Container from './components/container';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App bg-black">
      <Navbar/>
      <Container/>
    </div>
  );
}

export default App;
