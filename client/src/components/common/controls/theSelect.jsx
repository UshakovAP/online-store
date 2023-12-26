import React from 'react';

const TheSelect = ({ defaultValue, options, name, value, onChange, error }) => {
    const getInputClasses = () => {
        return 'form-select' + (error ? ' is-invalid' : '');
    };

    return (
        <>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            >
                {defaultValue && (
                    <option value="" disabled>
                        {defaultValue}
                    </option>
                )}
                {options.map(option => (
                    <option key={option._id} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

export default TheSelect;
