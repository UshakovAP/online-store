import React from 'react';

const Loader = ({ style }) => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={style}
        >
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </div>
        </div>
    );
};

export default Loader;
