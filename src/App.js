import './App.css';
import React, { useState, useEffect } from 'react';

import Pokedex from './Pages/Pokedex';


function App() {
     return (
          <div className="App">
            <h1>Pokedex</h1>
            <Pokedex />
          </div>
     );
}

export default App;
