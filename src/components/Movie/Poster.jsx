import React from 'react'

const Poster = ( {imageSrc} ) => {
  return (
    <>
      <div className="movie-page__image" style={{backgroundImage: `url(${imageSrc})`}}></div>
    </>
  )
}

export default Poster
