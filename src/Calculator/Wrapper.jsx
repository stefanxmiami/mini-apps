import React from 'react';
import "./style/calculator.css"

function Wrapper({children}) {
    return (
        <div className="wrapper">{children}</div>
    );
}

export default Wrapper;