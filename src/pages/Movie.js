import React, { useEffect } from 'react'
import {API_KEY} from '../consts'
import getMoveInfo from '../services/getMoveInfo'
import { useParams, useNavigate } from "react-router-dom"
import './Movie.css'


const Movie = ({movieId}) => {
const { idParam } = useParams()
console.log(movieId)
const [filmInfo, setFilmInfo] = React.useState({})

// async function getMovieData (id) {
//   console.log('1 '+ id)
//     await getMoveInfo(id,API_KEY)
//     .then(data => { 
//       setFilmInfo(prevState => ({
//         ...prevState, 
//         img: data.src, 
//         name: data.title, 
//         descr: data.descr
//       }))
      
//       console.log(filmInfo)
//     })
    
    
//   }
//   getMovieData(idParam)


  useEffect( () => {
    window.scrollTo(0, 0)
    getMoveInfo(idParam,API_KEY)
    .then(data => { 
      setFilmInfo(prevState => ({
        ...prevState, 
        img: data.src, 
        name: data.title, 
        descr: data.descr
      }))
    })

  },[idParam])
  let history = useNavigate();
  
  return (
    
    <div>
      <div className='btn-wrap'>
      <button type='button' className='goback-btn' onClick={()=> history(-1)}>Назад</button>
      </div>
            <div className="movie-page">
              
                <div className="modal-movie-conteiner">
                    <div className="movie-page__image" style={{backgroundImage: `url(${filmInfo.img})`}}></div>
                    <div className="movie-page-info">
                        <h1 className="movie-page__title">{filmInfo.name}</h1>
                    
                        <div className="modal_movie-info-year"></div>
                        <div className="modal_movie-info-genre"></div>
                        <div className="modal_descr">{filmInfo.descr}</div>
                    </div>
                    
                </div>
                
            </div>
        </div>
  )
}

export default Movie
