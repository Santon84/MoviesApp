import React from 'react'
import Header from './components/Header';
import Main from './components/Main';
import Menu from './components/Menu/Menu';
import Pagination from './components/Pagination';
import Modal from './components/Modal';
import getMovies from './services/GetMoviesData';
import { API_KEY } from './consts'
import './App.css';

class fieldsConstructor {
  constructor(options) {
    this.id = options.id
    this.array = options.array
    this.rating = options.rating
    this.nameRu = options.nameRu
    this.nameOrig = options.nameOrig
    this.year = options.year
    this.genre = options.genre
    this.posterUrl = options.posterUrl
    this.pageCount = options.pageCount
  }

}

const topMovieFilds = new fieldsConstructor({
  id: 'filmId',
  array: 'films',
  rating: 'rating',
  nameRu: 'nameRu',
  year: 'year',
  genre: 'genres',
  posterUrl: 'posterUrlPreview',
  pageCount: 'pagesCount'

})
const filterMovieFilds = new fieldsConstructor({
  id: 'kinopoiskId',
  array: 'items',
  rating: 'ratingKinopoisk',
  nameRu: 'nameRu',
  year: 'year',
  genre: 'genres',
  posterUrl: 'posterUrlPreview',
  pageCount: 'totalPages',
  nameOrig: 'nameOriginal'


})

function App() {

  const baseUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2/';
  //let currentUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS';
  
  const [currentFields, setCurrentFields] = React.useState(topMovieFilds);
  
  const [selectedType, setSelectedType] = React.useState('FILM');
  const [active, setActive] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentUrl, setCurrentUrl] = React.useState('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS')
  const [films, setFilms] = React.useState([])
  const [pageCount, setPageCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedFilmInfo, setSelectedFilmInfo] = React.useState({descr: '', name:'', img:''});
  const onActiveClick = (cur) => {
    setActive(cur);
    setCurrentPage(cur);
  }


  React.useEffect(() => {
    setActive(currentPage);
  },[currentPage])
  // function getMovies(url, API_KEY) {

  //   setIsLoading(true);
  //   if (!API_KEY) {
  //       alert('No API Key! Please check parameters');
  //       return;
  //   }
  //   fetch(url+'&page='+currentPage, {
  //               method: 'GET',
  //               headers: {
  //                 'X-API-KEY': API_KEY,
  //                 'Content-Type': 'application/json',
  //               }
  //   })
  //   .then(res => res.json())
  //   .then(json => {
  //       console.log(json);
  //       setFilms(json.films);
  //       console.log(json.pagesCount);
  //       setPageCount(json.pagesCount);
  //   })
  //   .catch(err => {
  //       alert('Failed to fetch data')
  //       console.log(err)
  //   })
  //   .finally(() => setIsLoading(false))
  // }

  React.useEffect(() => {
  
  (async () => {  
    await getMovies(currentUrl+'&page='+currentPage, API_KEY)
    .then(json => {
    if (json?.films?.length) {
      setFilms(json.films.filter(item => !item.genres.includes('мультфильм')));
      setPageCount(json.pagesCount > 20 ? 20 : json.pagesCount)
    } else if (json?.items?.length) {
      setFilms(json?.items?.filter(item => !item.genres.some(genre => genre.genre === 'мультфильм' || genre.genre === 'короткометражка')));
      setPageCount(json.totalPages)
    }  
    else {
      console.log('Error in data');
      console.log(json);
      
    };
    })
    .catch(err => alert(err))
    .finally(() => setIsLoading(false))  
   } )()



  },[currentPage, currentUrl])

  
  return (
    <div className="App">
      <Header />
      <Menu globalUrl ={currentUrl} setSelectedType={setSelectedType} selectedType={selectedType} setIsLoading={setIsLoading} setFilms={setFilms} setPageCount={setPageCount} setCurrentUrl={setCurrentUrl} setCurrentPage={setCurrentPage}/>
      <Main setSelectedFilmInfo={setSelectedFilmInfo} setShowModal={setShowModal} selectedType={selectedType} active={active} isLoading={isLoading} movies={films} fields={currentFields}/>

      
         
      <Pagination pageCount = {pageCount} currentActive={active} onActiveClick={onActiveClick}/>
      <Modal setSelectedFilmInfo={setSelectedFilmInfo} filmInfo={selectedFilmInfo} showModal={showModal} setShowModal={setShowModal}/>
    </div>
  );
}

export default App;
