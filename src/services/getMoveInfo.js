
function getMoveInfo(id, API_KEY) {
    
    if (!API_KEY ) {
        alert('No API Key! Please check parameters');
        return;
    }
    if (!id) {
      alert('No ID');
      return;
    }
    const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/' + id;
    
    return fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': API_KEY ,
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
    .then((data) => {
        // const renderData = {};
        // console.log(data);
        // renderData.descr = data.description;
        // renderData.title = data.nameRu;
        // renderData.src = data.posterUrl;
        // renderData.nameOriginal = data.nameOriginal;
        // renderData.filmLength = data.filmLength;
        // renderData.ratingAgeLimits = data.ratingAgeLimits;
        // renderData.ratingImdb = data.ratingImdb;
        // renderData.ratingKinopoisk = data.ratingKinopoisk;
        // renderData.slogan = data.slogan;
        // renderData.year = data.year;
        // renderData.webUrl = data.webUrl;
        // renderData.genres = data.genres;
        // renderData.countries = data.countries;
        // renderData.kinopoiskId = data.kinopoiskId;


        return data;
    })
    .catch(err => {
        console.log(err);
        alert('Ошибка получения данных о фильме')
    })
    
  }   
  
//     fillModal('.modal_image','.modal_title','.modal_descr','',renderData)
//     console.log(data);
//   } 

export default getMoveInfo;
