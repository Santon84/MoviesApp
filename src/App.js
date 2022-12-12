
import Home from './Home';
import Movie from './pages/Movie';
import React from 'react'
import Header from './components/Header';
import {Routes, Route} from 'react-router-dom'
function App() {
  const [movieId, setMovieId] = React.useState('');
  
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home setMovieId = {setMovieId} />}/>
        <Route path='/movie/:idParam' element={<Movie movieId={movieId} />}/>

      </Routes>
      
      </div>
  );
}


export default App;



