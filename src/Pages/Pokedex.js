import '../App.css';
import React, { useState, useEffect } from 'react';

function Pokedex() {
     const [pokemon, setPokemon] = useState([]);
     const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
     const [nextPageUrl, setNextPageUrl] = useState();
     const [prevPageUrl, setPrevPageUrl] = useState();

     useEffect(() => {
          async function fetchData() {
              const response = await fetch(currentPageUrl);
              const data = await response.json();
              setNextPageUrl(data.next);
              setPrevPageUrl(data.previous);
      
              const details = await Promise.all(
                  data.results.map(async (pokemon) => {
                      const response = await fetch(pokemon.url);
                      return response.json();
                  })
              );
      
              setPokemon(details);
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
          <div className="Container">
               <div className="Pokedex">
                    {pokemon.map((pokemon, index) => (
                         <div key={pokemon.name} className="Pokemon-Card">
                              <div className="Text">
                                   <p># {pokemon.id}</p>
                                   <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                              </div>
                              <div>
                                   {pokemon.sprites && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
                              </div>
                         </div> ))}
                    <div>
                         {prevPageUrl && <button onClick={gotoPrevPage}>Prev</button>}
                         {nextPageUrl && <button onClick={gotoNextPage}>Next</button>}
                    </div>
               </div>
          </div>

     )
}

export default Pokedex;