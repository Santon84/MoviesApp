import React from 'react'
import './Menu.css';
import DropdownField from './DropdownField';

import getMovies from '../../services/GetMoviesData';
import { ALL_COUNTRIES, ALL_GENRES, ALL_TYPES, API_KEY,TOP_MOVIES } from '../../consts';
import RangeSelector from './RangeSelector';

function Menu({setFilterFields, setTopFields, globalUrl, setSelectedType, selectedType, setFilms, setCurrentUrl , setPageCount, setCurrentPage, setIsLoading}) {

const [selectedGenre, setSelectedGenre] = React.useState('');
const [selectedYear, setSelectedYear] = React.useState({});
const [selectedCountry, setSelectedCountry] = React.useState('');
const [selectedTop, setSelectedTop] = React.useState('top100');
const [selectedRating, setSelectedRating] = React.useState({});


async function getData() {
  setFilterFields();
  console.log(selectedRating)
  const ratingFrom = parseInt(selectedRating.start) || '5',
        ratingTo = parseInt(selectedRating.end) || '10',
        sorting = '&order=RATING';
  setIsLoading(true);
  setCurrentPage(1);
  let yearStart = selectedYear.start ,
      yearEnd = selectedYear.end;

  let currentUrl = `https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=${selectedCountry}&genres=${selectedGenre}${sorting}&type=${selectedType}&ratingFrom=${ratingFrom}&ratingTo=${ratingTo}&yearFrom=${yearStart}&yearTo=${yearEnd}`

 

 
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
    
    if (globalUrl !== TOP_MOVIES.top_100 && globalUrl !== TOP_MOVIES.top_250) {
      setSelectedTop('');
    }

  },[globalUrl])
  


  return (
        <div className="side-filter">
                <div className="filter">
                    <h2>Фильтр</h2>

                    <div className="link-cloud">
                       
                        <a href='#top-250' onClick={(e)=> {
                          
                          e.preventDefault();
                          setCurrentUrl(TOP_MOVIES.top_250)
                          setCurrentPage(1);
                          setSelectedTop('top250');
                          setTopFields();
                        }
                        }className={selectedTop === 'top250' ? "filter-link top active" : "filter-link top"} data-url="top_250">TOP 250</a>
                        <a href='#top-100' onClick={(e)=> {
                          
                          e.preventDefault();
                          setCurrentUrl(TOP_MOVIES.top_100)
                          setCurrentPage(1);
                          setSelectedTop('top100');
                          setTopFields();
                        }
                        } className={selectedTop === 'top100' ? "filter-link top active" : "filter-link top"} data-url="top_100">TOP 100</a>
                    </div>
                    <div className='ranges-wrapper'>
                        
                    <RangeSelector minVal={1960} maxVal={2022} step={1} title='Год' setFunction={setSelectedYear}/>
                    <RangeSelector minVal={0} maxVal={10} step={0.1} title='Рейтинг' setFunction={setSelectedRating} />
                    </div>
                  <div className='filter-fields'>
                    
                    <DropdownField fieldName='Тип' setSelectedValue={setSelectedType} selectedValue={selectedType} dataList={ALL_TYPES} valueFieldName='value' />
                    <DropdownField fieldName='Жанры' setSelectedValue={setSelectedGenre} selectedValue={selectedGenre} dataList={ALL_GENRES} valueFieldName='genre' />

                    
                    <DropdownField fieldName='Страны' setSelectedValue={setSelectedCountry} selectedValue={selectedCountry} dataList={ALL_COUNTRIES} valueFieldName='country' />
                   
                    <button className="button button-select" onClick={getData}>Выбрать</button>
                  </div>
                </div>
            </div>
    
  );
}

export default Menu;
