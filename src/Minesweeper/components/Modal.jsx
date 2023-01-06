import React from 'react';
import '../style/style.css'

const Modal = ({ children, startNewGame }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default Modal;