import React from 'react';

const ExpressionScreen = ({ value, maxLength }) => (
    <div className="expression-screen">
        {value && value.length > maxLength ? value.slice(0, maxLength) + "..." : value}
    </div>
);

export default ExpressionScreen;