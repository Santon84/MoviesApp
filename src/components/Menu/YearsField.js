import React from 'react'



function YearsField({setSelectedYear}) {
  const years = [];
  const fillYearSelector = () => {
    years.push('Все года');
    years.push('2010 - 2020');
    years.push('2000 - 2010');
    const yearNow = new Date().getFullYear();
    const yearStart = 1950;
  
    for (let i = yearNow; i >= yearStart; i--) {
      years.push(`${i}`);
  
    }
    return years;
  }
  fillYearSelector();
  
   return (
    <div className='filter-field'>
    <label htmlFor="year-select">Года</label>
      <select onChange={(e) => setSelectedYear(e.target.value)} id="year-select">
            {
              years.map((elem,index) => {
                return <option key={index} value={elem === 'Все года' ? '' : elem}>{elem}</option>
              })
            }
    </select>
    </div>
   )
}

export default YearsField