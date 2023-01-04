import React from 'react';
import '../style/style.css'

const FlagCounter = ({ flagsRemaining }) => {
    return (
        <div className="flag-counter">
            Flags remaining: {flagsRemaining}
        </div>
    );
};

export default FlagCounter;