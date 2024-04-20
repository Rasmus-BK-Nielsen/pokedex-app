import React from "react";
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Pokedex from './Pages/Pokedex';
import './App.css';

export default function App() {
     return (
          <Router>
               <div className="Navbar">
                    <Link to="/pokedex" className="Link">Pokedex</Link>
               </div>
               <div className="Content">
                    <Routes>
                         <Route path="/" element={<Pokedex />} />
                         <Route path="/pokedex" element={<Pokedex />} />
                    </Routes>
               </div>
          </Router>
     );
}