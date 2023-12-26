import React, { useState } from 'react';

const TheInput = ({
    style,
    type,
    name,
    placeholder,
    value,
    onChange,
    error,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '');
    };

    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="input-group has-validation">
            <input
                className={getInputClasses()}
                style={style}
                type={showPassword ? 'text' : type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {type === 'password' && (
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={toggleShowPassword}
                >
                    <i
                        className={'bi bi-eye' + (showPassword ? '-slash' : '')}
                    ></i>
                </button>
            )}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default TheInput;
