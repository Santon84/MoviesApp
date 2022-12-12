import React, { useEffect, useRef } from 'react'
import './RangeSelector.css'
const RangeSelector = ({minVal, maxVal, step, title, setFunction}) => {

    
    const minValue = useRef();
    const maxValue = useRef();
    const rangeRef = useRef();
    const minInputRef = useRef();
    const maxInputRef = useRef();
    
    //const minCurValue = useRef(20);
    // const rangeInput = document.querySelectorAll(".range-input input"),
    // priceInput = document.querySelectorAll(".price-input input"),
    // range = document.querySelector("  .progress");
    // let priceGap = 0;
    
    // priceInput.forEach(input =>{
    //     input.addEventListener("input", e =>{
    //         let minPrice = parseInt(priceInput[0].value),
    //         maxPrice = parseInt(priceInput[1].value);
            
    //         if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
    //             if(e.target.className === "input-min"){
    //                 rangeInput[0].value = minPrice;
    //                 console.log('IF')
    //                 console.log(rangeInput[0].max);
    //                 console.log(rangeInput[0].min);
    //                 range.style.left = (((minPrice-rangeInput[0].min) / (rangeInput[0].max - rangeInput[0].min)) * 100) + "%";
    //             }else{
    //                 console.log('IF else')
    //                 rangeInput[1].value = maxPrice;
    //                 range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
    //             }
    //         }
    //         else {
    //             console.log('Else else')
    //         }
    //     });
    // });
    // rangeInput.forEach(input =>{
    //     input.addEventListener("input", e =>{
            
    //         let minVal = parseInt(rangeInput[0].value),
    //         maxVal = parseInt(rangeInput[1].value);
    //         if(maxVal === rangeInput[0].min) {
    //             rangeInput[0].style.zIndex=1;
    //             rangeInput[1].style.zIndex=1000;
                
    //         }
    //         if(minVal === rangeInput[1].max) {
                
    //             rangeInput[1].style.zIndex=1;
    //             rangeInput[0].style.zIndex=1000;
    //         }
    //         if((maxVal - minVal) < priceGap){
    //             if(e.target.className === "range-min"){
    //                 rangeInput[0].value = maxVal - priceGap
    //             }else{
    //                 rangeInput[1].value = minVal + priceGap;
    //             }
    //         }else{
    //             priceInput[0].value = minVal;
    //             console.log(minVal)
    //             priceInput[1].value = maxVal;
    //             range.style.left = (((minVal - rangeInput[0].min) / (rangeInput[0].max - rangeInput[0].min)) * 100) + "%";
    //             range.style.right = 100 - ((maxVal- rangeInput[1].min) / (rangeInput[1].max -  rangeInput[1].min)) * 100 + "%";
    //         }
    //     });
    // });
    useEffect(() =>{
        minValue.current.value = minVal;
        maxValue.current.value = maxVal;
        minInputRef.current.value = minVal;
        maxInputRef.current.value = maxVal;
        setFunction(prev => ({...prev, start: minValue.current.value}) )
        setFunction(prev => ({...prev, end: maxValue.current.value}) )
    },[])




const handleInputChange = (e) => {
    let minVal = parseInt(minInputRef.current.value);
    let maxVal = parseInt(maxInputRef.current.value);
    let min = parseInt(minInputRef.current.min);
    let max = parseInt(maxInputRef.current.max);

    if (e.target.className === 'input-min' && minVal > min){
        if (maxVal <= minVal) {
            minInputRef.current.value = maxInputRef.current.value;
            minVal = maxVal;
            minValue.current.style.zIndex=1000;
            maxValue.current.style.zIndex=1;
            
        }
        if (minVal < min) {
            minInputRef.current.value = min;
        }
    minValue.current.value = minVal;
    rangeRef.current.style.left = (((minVal - min) / (max - min)) * 100) + "%";
    setFunction(prev => ({...prev, start: minValue.current.value}) )
    }
    if (e.target.className === 'input-max' && maxVal >= minVal){
        if (maxVal <= minVal) {
            maxInputRef.current.value = minInputRef.current.value;
            maxVal = minVal;
            minValue.current.style.zIndex=1;
            maxValue.current.style.zIndex=1000;
        }
        if (maxVal > max) {
            maxInputRef.current.value = max
        }
    maxValue.current.value = maxVal;
    rangeRef.current.style.right = 100 - ((maxVal- min) / (max - min))*100 +"%"
    setFunction(prev => ({...prev, end: maxValue.current.value}) )
    
    }
}    
const handleChange = (e) =>{
    
    let minVal = Number(minValue.current.value);
    let maxVal = Number(maxValue.current.value);
    let min = Number(minValue.current.min);
    let max = Number(minValue.current.max);
    
    if (e.target.className === 'range-min'){
        if (maxVal <= minVal) {
            minValue.current.value = maxValue.current.value;
            minVal = maxVal;
            minValue.current.style.zIndex=1000;
            maxValue.current.style.zIndex=1;
            
        }
    minInputRef.current.value = minVal;
    rangeRef.current.style.left = (((minVal - min) / (max - min)) * 100) + "%";
    setFunction(prev => ({...prev, start: minValue.current.value}) )
    }
    if (e.target.className === 'range-max'){
        if (maxVal <= minVal) {
            maxValue.current.value = minValue.current.value;
            maxVal = minVal;
            minValue.current.style.zIndex=1;
            maxValue.current.style.zIndex=1000;
        }
    maxInputRef.current.value = maxVal;
    rangeRef.current.style.right = 100 - ((maxVal- min) / (max - min))*100 +"%"
    setFunction(prev => ({...prev, end: maxValue.current.value}) )
    
    }

}

  return (
    <div className='range-wrapper'>
        <h3>{title}</h3>
        <div className="price-input">
          <div className="field">
            
            <input type="number" ref={minInputRef} onChange={e => handleInputChange(e)} className="input-min" min={minVal} max={maxVal}/>
          </div>
          <div className="separator">-</div>
          <div className="field">
           
            <input type="number" ref={maxInputRef} onChange={e => handleInputChange(e)} className="input-max" min={minVal} max={maxVal} />
          </div>
        </div>
        <div className="slider">
          <div ref={rangeRef} className="progress"></div>
        </div>
        <div className="range-input">
          <input type="range" ref={minValue} className="range-min" onChange={e => handleChange(e)} min={minVal} max={maxVal} step={step}/>
          <input type="range" ref={maxValue} className="range-max" onChange={e => handleChange(e)} min={minVal} max={maxVal} step={step}/>
        </div>
    </div>
  )
}

RangeSelector.defaultProps = {
    minValue: 1, maxValue:100, step:1
}

export default RangeSelector
