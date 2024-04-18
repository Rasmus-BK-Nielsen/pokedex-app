import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function NavBar() {
     return (
          <div>
               <Link to="/pokedex">Pokedex</Link>
          </div>
     )
}

export default NavBar;