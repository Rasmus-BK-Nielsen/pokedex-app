import './Pokedex.css';
import React, { useState, useEffect, useRef } from 'react';

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

     const [showOverlay, setShowOverlay] = useState(false);
     const [selectedPokemon, setSelectedPokemon] = useState(null);

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
          if (currentPage < totalPages) {
               setCurrentPageUrl(nextPageUrl);
               setCurrentPage(prev => prev + 1);
          }
     }

     function gotoPrevPage() {
          if (currentPage > 1) {
               setCurrentPageUrl(prevPageUrl);
               setCurrentPage(prev => prev - 1);
          }
     }

     function goToPage(pageNr) {
          setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon?offset=${(pageNr - 1) * 20}&limit=20`);
          setCurrentPage(pageNr);
     }

     function PokemonDetails({ pokemon, onClose }) {
          const overlayRef = useRef(null);

          useEffect(() => {
              function handleClickOutside(event) {
                  if (overlayRef.current && !overlayRef.current.contains(event.target)) {
                      onClose();
                  }
              }

              document.addEventListener('mousedown', handleClickOutside);
              return () => {document.removeEventListener('mousedown', handleClickOutside)};

          }, [onClose]);

          if (!pokemon) return null;
      
          return (
              <div className="Overlay">
                  <div className="Overlay-inner" ref={overlayRef}>
                      <h1>{pokemon.name.toUpperCase()}</h1>
                      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                      <p>Height: {pokemon.height}</p>
                      <p>Weight: {pokemon.weight}</p>
                      <div>
                          {pokemon.stats.map(stat => (
                              <p key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</p>
                          ))}
                      </div>
                      <div>
                          <h4>Types:</h4>
                          {pokemon.types.map(type => (
                              <span key={type.type.name}>{type.type.name} </span>
                          ))}
                      </div>
                  </div>
              </div>
          );
      }
      
     return (
          <div className="Container">
               {showOverlay && <PokemonDetails pokemon={selectedPokemon} onClose={() => setShowOverlay(false)} />}
               <div className="Pokedex">
                    {pokemon.map((pokemon, index) => {
                         const type1 = pokemon.types[0].type.name;
                         const type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name : type1;

                         return (
                         <div 
                           key={pokemon.name} 
                           className="Pokemon-Card" 
                           style={{background: `linear-gradient(to right, ${typeColors[type1]}, ${typeColors[type2]})`}}
                           onClick={() => {
                              setSelectedPokemon(pokemon);
                              setShowOverlay(true);
                           }}>
                              <div className="Text">
                                   <p># {pokemon.id}</p>
                                   <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                              </div>
                              <div>
                                   {pokemon.sprites && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
                              </div>
                         </div> );
                    })}

               </div>
               <div className="Pagination">
                    <button 
                         onClick={gotoPrevPage}
                         className={`button button-arrow ${currentPage === 1 ? 'button-current' : ''}`}
                         > &larr;
                    </button>
                    {currentPage > 3 && <span> . . . </span>}
                    {[...Array(totalPages).keys()].filter(page => Math.abs(currentPage - (page + 1)) <= 2).map(page => (
                         <button 
                              key={page} 
                              onClick={() => goToPage(page + 1)}
                              className={`button ${currentPage === page + 1 ? 'button-current' : ''}`}
                           >{page + 1}
                         </button>
                    ))}
                    {currentPage < totalPages - 2 && <span> . . . </span>}
                    <button 
                         onClick={gotoNextPage}
                         className={`button button-arrow ${currentPage === totalPages ? 'button-current' : ''}`}
                         > &rarr;
                    </button>
               </div>
          </div>
     )
}