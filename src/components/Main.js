import React from 'react'
import './Main.css';
import { ALL_TYPES, API_KEY } from '../consts';

import {Link} from 'react-router-dom';

function Main({ setMovieId, setSelectedFilmInfo, setShowModal, isLoading, movies, fields, selectedType}) {
  

  async function onMovieClick (id) {

    // await getMoveInfo(id,API_KEY)
    // .then(data => {
    //   setSelectedFilmInfo(prevState => ({
    //     ...prevState, 
    //     img: data.src, 
    //     name: data.title, 
    //     descr: data.descr
    //   }))
    //   console.log(data)})
    // .finally(setShowModal(true))
    
    

    setMovieId(id);
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
              <div className="movie-rating">{parseInt(movie[fields.rating])>10 && movie[fields.rating] ? '' : movie[fields.rating]}</div>
            </div>
        
        )
  
  
  // <li key={index}>{movie.nameRu}</li>
  
  })
}

</div>


    </div>
  );
}

export default Main;
