import './App.css';
import React, { useState, useEffect } from 'react';

function PokemonList() {
     const [pokemon, setPokemon] = useState([]);
     const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
     const [nextPageUrl, setNextPageUrl] = useState();
     const [prevPageUrl, setPrevPageUrl] = useState();

     useEffect(() => {
          async function fetchData() {
               const response = await fetch(currentPageUrl);
               const data = await response.json();
               setPokemon(data.results);
               setNextPageUrl(data.next);
               setPrevPageUrl(data.previous);
          }
          fetchData();
     }, [currentPageUrl]);

     function gotoNextPage() {
          setCurrentPageUrl(nextPageUrl);
     }

     function gotoPrevPage() {
          setCurrentPageUrl(prevPageUrl);
     }

     return (
          <div>
               {pokemon.map((pokemon, index) => (
                    <div key={pokemon.name}>{pokemon.name}</div>
               ))}
               <div>
                    {prevPageUrl && <button onClick={gotoPrevPage}>Previous</button>}
                    {nextPageUrl && <button onClick={gotoNextPage}>Next</button>}
               </div>
          </div>
     )
}

function App() {
     return (
          <div className="App">
            <h1>Pokedex</h1>
            <PokemonList />
          </div>
     );
}

export default App;
