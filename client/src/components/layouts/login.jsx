import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RegisterForm from '../UI/registerForm';
import LoginForm from '../UI/loginForm';

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === 'register' ? type : 'login'
    );

    const toggleFormType = () => {
        setFormType(prevState =>
            prevState === 'register' ? 'login' : 'register'
        );
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-3 shadow">
                    {formType === 'register' ? (
                        <>
                            <h2 className="mb-3 text-center">Регистрация</h2>
                            <RegisterForm />
                            <p className="mb-0 text-center">
                                <a
                                    className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                                    onClick={toggleFormType}
                                    role="button"
                                >
                                    Уже зарегистрированы? Войти
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="mb-3 text-center">Вход</h2>
                            <LoginForm />
                            <p className="mb-0 text-center">
                                <a
                                    className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                                    onClick={toggleFormType}
                                    role="button"
                                >
                                    У вас нет учетной записи? Зарегистрируйтесь!
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
