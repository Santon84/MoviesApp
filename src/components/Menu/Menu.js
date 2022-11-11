import React from 'react'
import './Menu.css';
import DropdownField from './DropdownField';
import YearsField from './YearsField';
import getMovies from '../../services/GetMoviesData';
import { ALL_COUNTRIES, ALL_GENRES, ALL_TYPES, API_KEY,TOP_MOVIES } from '../../consts';


function Menu({setSelectedType, selectedType, setFilms, setCurrentUrl , setPageCount, setCurrentPage, setIsLoading}) {

const [selectedGenre, setSelectedGenre] = React.useState('');
const [selectedYear, setSelectedYear] = React.useState('');
const [selectedCountry, setSelectedCountry] = React.useState('');


async function getData() {
  const ratingFrom = '',
        ratingTo = '10',
        sorting = '&order=RATING';
  setIsLoading(true);
  setCurrentPage(1);
  let yearStart = '',
      yearEnd = '';
  if (selectedYear.length > 8) {
    const years = selectedYear.split(' - ');
    yearStart = years[0];
    yearEnd = years[1];

  }
  if (selectedYear.length === 4) {

    yearStart = selectedYear;
    yearEnd = selectedYear;
  }
  
  let currentUrl = `https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=${selectedCountry}&genres=${selectedGenre}${sorting}&type=${selectedType}&ratingFrom=6&ratingTo=10&yearFrom=${yearStart}&yearTo=${yearEnd}`

 

 
    await getMovies(currentUrl, API_KEY)
    .then(json => {
      if (json?.items?.length) {
      setFilms(json?.items?.filter(item => !item.genres.some(genre => genre.genre === 'мультфильм' || genre.genre === 'короткометражка')));
      setPageCount(json.totalPages)
      console.log('OK')
    } else {
      console.log('Error in data');
      console.log('');
      
    };
    })
    .catch(err => alert(err))
    .finally(()=> {
      setCurrentUrl(currentUrl)
      setIsLoading(false);
    })
      
  } 
  
  React.useEffect(() => {
    console.log(selectedGenre)
  },[selectedGenre])
  

  return (
        <div className="side-filter">
                <div className="filter">
                    <h2>Фильтр</h2>

                    <div className="link-cloud">
                       
                        <a href='#top-250' onClick={(e)=> {
                          
                          e.preventDefault();
                          setCurrentUrl(TOP_MOVIES.top_250)
                          setCurrentPage(1);
                        }
                        }className="filter-link top" data-url="top_250">TOP 250</a>
                        <a href='#top-100' onClick={(e)=> {
                          
                          e.preventDefault();
                          setCurrentUrl(TOP_MOVIES.top_100)
                          setCurrentPage(1);
                        }
                        } className="filter-link top" data-url="top_100">TOP 100</a>
                    </div>
                  <div className='filter-fields'>
                    <DropdownField fieldName='Тип' setSelectedValue={setSelectedType} selectedValue={selectedType} dataList={ALL_TYPES} valueFieldName='value' />
                    <DropdownField fieldName='Жанры' setSelectedValue={setSelectedGenre} selectedValue={selectedGenre} dataList={ALL_GENRES} valueFieldName='genre' />

                    <YearsField setSelectedYear = {setSelectedYear}/>
                    <DropdownField fieldName='Страны' setSelectedValue={setSelectedCountry} selectedValue={selectedCountry} dataList={ALL_COUNTRIES} valueFieldName='country' />
                   
                    <button className="button button-select" onClick={getData}>Выбрать</button>
                  </div>
                </div>
            </div>
    
  );
}

export default Menu;
