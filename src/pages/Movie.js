import React, { useEffect } from 'react'
import {API_KEY} from '../consts'
import getMoveInfo from '../services/getMoveInfo'
import { useParams, useNavigate } from "react-router-dom"
import './Movie.css'
import Poster from '../components/Movie/Poster'

const Movie = ({movieId}) => {
const { idParam } = useParams()
console.log(movieId)
const [filmInfo, setFilmInfo] = React.useState({})


  useEffect( () => {
    window.scrollTo(0, 0)
    getMoveInfo(idParam,API_KEY)
    .then(data => { 
      setFilmInfo({
        
        img: data.posterUrl, 
        name: data.nameRu, 
        descr: data.description,
        year : data.year,
        webUrl : data.webUrl,
        genres : data.genres,
        countries : data.countries,
        nameOriginal : data.nameOriginal,
        filmLength : data.filmLength,
        ratingAgeLimits : data.ratingAgeLimits,
        ratingImdb : data.ratingImdb,
        ratingKinopoisk : data.ratingKinopoisk,
        slogan : data.slogan,
        kinopoiskId : data.kinopoiskId
      })
    })
    return setFilmInfo({});
    
  },[idParam])
  let history = useNavigate();
  
  return (
    
    <div>
      <div className='btn-wrap'>
      <button type='button' className='goback-btn' onClick={()=> history(-1)}>Назад</button>
      </div>
            <div className="movie-page">
              
                <div className="modal-movie-conteiner">
                    <Poster imageSrc={filmInfo.img} />
                    <div className="movie-page-info">
                        <h1 className="movie-page__title">{filmInfo?.name}</h1>
                    
                        <div className="movie-page__nameOrig">{filmInfo?.nameOriginal}</div>
                        <div className="movie-page__length">{'Продолжительность: '+ (filmInfo?.filmLength || '') + ' мин'}</div>
                        <div className="movie-page__imdb">{'IMDB: '+ (filmInfo?.ratingImdb || '')}</div>
                        <div className="movie-page__kinopoisk">{'Кинопоиск: '+ (filmInfo?.ratingKinopoisk || '')}</div>
                        <div className="movie-page__year">{filmInfo?.year}</div>
                        <div className="movie-page__genres">{filmInfo?.genres?.map(genre => genre.genre).join(',')}</div>
                        <div className="movie-page__countries">{filmInfo?.countries?.map(country => country.country).join(',')}</div>
                        <div className="movie_descr">Описание фильма</div>
                        <div className="movie_descr">{filmInfo?.descr}</div>
                        <a href={filmInfo?.webUrl}>{filmInfo?.webUrl}</a>
                    </div>
                    
                    
                </div>
            </div>
        </div>
  )
}

export default Movie
