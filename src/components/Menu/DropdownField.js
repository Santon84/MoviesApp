import React from 'react'


function DropdownField({fieldName, setSelectedValue, selectedValue, dataList, valueFieldName}) {

   return (
    <div className='filter-field'>
    <label htmlFor="filter-label">{fieldName}</label>
                        <select id="filter-select" value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                        
                          {
                            
                            dataList.map((elem) => {
                              return <option key={elem?.id} value={elem?.id}>{elem[valueFieldName]}</option>
                            })
                          }
    </select>
    </div>
   )
}

export default DropdownField