
function getMovies(url, API_KEY) {


if (!API_KEY) {
    alert('No API Key! Please check parameters');
    return;
}
return fetch(url, {
            method: 'GET',
            headers: {
              'X-API-KEY': API_KEY,
              'Content-Type': 'application/json',
            }
})
.then(res => {
    console.log('response');
    console.log(res.response)
    return res.json();
})
.then(json => {
    console.log(json);
    console.log(url);
    return json;

})
.catch(err => {
    alert('Failed to fetch data')
    console.log('------------------message start');
    console.log(err.message)
    console.log(err)
    console.log('------------------message end');
})


       
          
        
 }
  


export default getMovies;
