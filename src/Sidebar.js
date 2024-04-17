import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
     return (
          <div className="Sidebar">
               <Link to="/pokedex">Pokedex</Link>
          </div>
     )
}

export default Sidebar;