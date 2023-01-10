import React from 'react'
import './Main.css';
import { ALL_TYPES } from '../consts';

import {Link} from 'react-router-dom';

function Main({ setMovieId, isLoading, movies, fields, selectedType}) {
  

  async function onMovieClick (id) {

    setMovieId(id);
    console.log('MOVIE CLICK')
    console.log(id)

  }

  return (
    <div>
        
        {isLoading ? <p>Загрузка данных...</p> : <h1>{ALL_TYPES[selectedType]}</h1>}
        
        <div className="movies-conteiner">
{
movies.map((movie, index) => {
  
  return (
            <div key={index} onClick={(e) => onMovieClick(e.currentTarget.dataset.id)} className="movie" data-id={movie[fields.id]}>
              <Link to={`/movie/${movie[fields.id]}`}> 
              <img className="movie-preview-poster" src={movie[fields.posterUrl]} alt={movie[fields.nameRu] ?? movie[fields.nameOrig]} />
              
              <p className="movie-title">{movie[fields.nameRu] ?? movie[fields.nameOrig]}</p>
              </Link>
              <p className="movie-genre">{movie[fields.year] || ''}, {movie[fields.genre].map(genre => genre.genre).join(', ')}</p> 
              <div className="movie-rating">{parseInt(movie[fields.rating])>10 && movie[fields.rating] ? '0.0' : movie[fields.rating]}</div>
            </div>
        
        )
  
  

  
  })
}

</div>


    </div>
  );
}

export default Main;
