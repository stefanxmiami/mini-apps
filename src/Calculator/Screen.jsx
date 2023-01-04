import React from 'react';
import "./style/calculator.css"

function Screen({value}) {
    return (
        <div className="screen">
            {value}
        </div>
    );
}

export default Screen;