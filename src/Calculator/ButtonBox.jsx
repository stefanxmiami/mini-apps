import React from 'react';
import "./style/calculator.css"

function ButtonBox({ children }) {

    return (
        <div className="buttonBox">{children}</div>
    );
}

export default ButtonBox;
