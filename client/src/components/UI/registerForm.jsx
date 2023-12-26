import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validator } from '../../utils/validator';
import TheLabel from '../common/controls/theLabel';
import TheInput from '../common/controls/theInput';
import TheButton from '../common/controls/theButton';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const { signUp } = useAuth();

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения!',
            },
            isEmail: {
                message: 'Электронная почта введена некорректно!',
            },
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения!',
            },
            isCapitalSymbol: {
                message:
                    'Пароль должен содержать хотя бы одну заглавную букву!',
            },
            isContainDigit: {
                message: 'Пароль должен содержать хотя бы одну цифру!',
            },
            min: {
                message: 'Пароль должен состоять минимум из 8 символов!',
                value: 8,
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
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        try {
            await signUp(data);
            navigate('/');
        } catch (error) {
            setErrors(error);
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

            <div className="d-flex justify-content-center">
                <TheButton
                    className="btn btn-primary"
                    type="submit"
                    disabled={!isValid}
                    text="Регистрация"
                />
            </div>
        </form>
    );
};

export default RegisterForm;
