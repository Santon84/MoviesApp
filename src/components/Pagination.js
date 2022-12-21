import React from 'react'

import './Pagination.css';

function Pagination({pageCount, currentActive, onActiveClick}) {

 const pages = [];
 for (let i=1; i <= pageCount;i++ ) { pages.push(i)}
  

  return (
    <div>
        <ul>
      {pages.map((page) => (
        
        <li
          onClick={() => onActiveClick(page)}
          className={currentActive === page ? 'tabs active' : 'tabs'}
          key={page}>
          {page}
        </li> 
        
      ))}
         
      </ul> 
    </div>
  );
}

export default Pagination;
