
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
        const renderData = {};
        renderData.descr = data.description;
        renderData.title = data.nameRu;
        renderData.src = data.posterUrlPreview;
        return renderData;
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
