import React from 'react';
import '../style/style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faX} from '@fortawesome/free-solid-svg-icons';

const Modal = ({children, startNewGame, onClose}) => {

    function handleNewGameClick() {
        window.location.reload();
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <FontAwesomeIcon onClick={onClose} className="fa-solid fa-x close-modal-icon"
                                 icon={faX}
                                 size='lg'/>
                <h1>You lost :(</h1>
                <div className="modal-buttons">
                    <button onClick={startNewGame}>Try again</button>
                    <button onClick={handleNewGameClick}>Main Menu</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;