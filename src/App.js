import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Pokedex from './Pages/Pokedex';
import Sidebar from './Sidebar';


function App() {
     return (
          <Router>
               <div className="App">
                    <Sidebar />
                    <div className="Content">
                         <Routes>
                              <Route path="/" element={<Pokedex />} />
                              <Route path="/pokedex" element={<Pokedex />} />
                         </Routes>
                    </div>
               </div>
          </Router>
     );
}

export default App;
