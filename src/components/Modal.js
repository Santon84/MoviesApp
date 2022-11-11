import React from 'react'
import './Modal.css';

function Modal({setSelectedFilmInfo, showModal, setShowModal, filmInfo, description, filmName}) {

 const onCloseClick = () => {
    setSelectedFilmInfo(prevState => ({
        ...prevState, 
        img:'', 
        name:'', 
        descr:''
    }))
    setShowModal(false);

 }
  

  return (
        <div className={(showModal) ? 'modal show' : 'modal hide'}>
            <div className="modal-window">
                <button id="modal-movie-close-btn" className="modal-close-button" onClick={() => onCloseClick()} >&times;</button>
                <div className="modal-movie-conteiner">
                    <div className="modal_image" style={{backgroundImage: `url(${filmInfo.img})`}}></div>
                    <div className="modal_movie-info">
                        <div className="modal_title">{filmInfo.name}</div>
                    
                        <div className="modal_movie-info-year"></div>
                        <div className="modal_movie-info-genre"></div>
                        <div className="modal_descr">{filmInfo.descr}</div>
                    </div>
                    
                </div>
                
            </div>
        </div>
  );
}

export default Modal;


