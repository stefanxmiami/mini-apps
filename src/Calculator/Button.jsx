import React from 'react';
import "./style/calculator.css"

function Button({ className, value, onClick }) {
    return (
        <button className={className} onClick={onClick}>
            {value}
        </button>
    );
}

export default Button;
