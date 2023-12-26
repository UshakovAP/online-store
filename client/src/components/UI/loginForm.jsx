import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validator } from '../../utils/validator';
import TheLabel from '../common/controls/theLabel';
import TheInput from '../common/controls/theInput';
import TheButton from '../common/controls/theButton';

const LoginForm = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: 'a1@example.com',
        password: '230330QQ',
    });
    const { signIn } = useAuth();
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения!',
            },
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения!',
            },
        },
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleChange = ({ target }) => {
        setData(prevState => ({ ...prevState, [target.name]: target.value }));
        setEnterError(null);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        try {
            await signIn(data);
            navigate('/');
        } catch (error) {
            setEnterError(error.message);
        }
    };

    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <div className="mb-3">
                <TheLabel htmlFor="email" text="Электронная почта" />
                <TheInput
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
            </div>

            <div className="mb-3">
                <TheLabel htmlFor="password" text="Пароль" />
                <TheInput
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />
            </div>

            {enterError && <p className="text-danger">{enterError}</p>}

            <div className="d-flex justify-content-center">
                <TheButton
                    className="btn btn-primary"
                    type="submit"
                    disabled={!isValid || enterError}
                    text="Войти"
                />
            </div>
        </form>
    );
};

export default LoginForm;
