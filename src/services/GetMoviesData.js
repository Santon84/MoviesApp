
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
.then(res => res.json())
.then(json => {
    console.log(json);
    console.log(url);
    return json;

})
.catch(err => {
    alert('Failed to fetch data')
    console.log(err)
})


       
          
        
 }
  


export default getMovies;
