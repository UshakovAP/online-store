import React from 'react';

const TheButton = ({ className, type, onClick, disabled, text }) => {
    return (
        <button
            className={className}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default TheButton;
