import './Pokedex.css';
import React, { useState, useEffect } from 'react';

const typeColors = {
     bug: '#A8B820',
     dark: '#705848',
     dragon: '#7038F8',
     electric: '#F8D030',
     fairy: '#EE99AC',
     fighting: '#C03028',
     fire: '#F08030',
     flying: '#A890F0',
     ghost: '#705898',
     grass: '#78C850',
     ground: '#E0C068',
     ice: '#98D8D8',
     normal: '#A8A878',
     poison: '#A040A0',
     psychic: '#F85888',
     rock: '#B8A038',
     steel: '#B8B8D0',
     water: '#6890F0'
};

export default function Pokedex() {
     const [pokemon, setPokemon] = useState([]);
     const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');

     const [nextPageUrl, setNextPageUrl] = useState();
     const [prevPageUrl, setPrevPageUrl] = useState();

     const [totalPages, setTotalPages] = useState(0);
     const [currentPage, setCurrentPage] = useState(1);

     useEffect(() => {
          async function fetchData() {
              const response = await fetch(currentPageUrl);
              const data = await response.json();
              const perPage = 20;

              setNextPageUrl(data.next);
              setPrevPageUrl(data.previous);
              setTotalPages(Math.ceil(data.count / perPage));
      
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
          setCurrentPage(prev => prev + 1);
     }

     function gotoPrevPage() {
          setCurrentPageUrl(prevPageUrl);
          setCurrentPage(prev => prev - 1);
     }

     function goToPage(pageNr) {
          setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon?offset=${(pageNr - 1) * 20}&limit=20`);
          setCurrentPage(pageNr);
     }

     return (
          <div className="Container">
               <div className="Pokedex">
                    {pokemon.map((pokemon, index) => (
                         <div key={pokemon.name} className="Pokemon-Card" style={{backgroundColor: typeColors[pokemon.types[0].type.name]}}>
                              <div className="Text">
                                   <p># {pokemon.id}</p>
                                   <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                              </div>
                              <div>
                                   {pokemon.sprites && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
                              </div>
                         </div> ))}

               </div>
               <div className="Pagination">
                    <button onClick={gotoPrevPage}>Prev</button>
                    {[...Array(totalPages).keys()].map((_,index) => (
                         <button 
                           key={index} 
                           onClick={() => goToPage(index + 1)}
                           style={{backgroundColor: currentPage === index + 1 ? 'lightgray' : 'white'}}
                           >{index + 1}
                         </button>
                    ))}
                    <button onClick={gotoNextPage}>Next</button>
               </div>
          </div>

     )
}