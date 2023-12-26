import React from 'react';

const TheLabel = ({ htmlFor, text }) => {
    return (
        <label className="form-label" htmlFor={htmlFor}>
            {text}
        </label>
    );
};

export default TheLabel;
