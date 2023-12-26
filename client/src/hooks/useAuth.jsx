import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import localStorageService, {
    setTokens,
} from '../services/localStorage.service';
import userService from '../services/user.service';
import config from '../config.json';

export const httpAuth = axios.create({
    baseURL: config.apiEndPoint + '/auth/',
    params: { key: process.env.REACT_APP_FIREBASE_KEY },
});

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    const errorCatcher = error => {
        const { message } = error.response.data;
        setError(message);
    };

    const signUp = async ({ email, password }) => {
        try {
            const { data } = await httpAuth.post('signUp', {
                email,
                password,
                returnSecureToken: true,
            });
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;

            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errorObject = {
                        email: 'Пользователь с такой электронной почтой уже существует!',
                    };
                    throw errorObject;
                }
            }
        }
    };

    const signIn = async ({ email, password }) => {
        try {
            const { data } = await httpAuth.post('signInWithPassword', {
                email,
                password,
                returnSecureToken: true,
            });
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;

            if (code === 400) {
                switch (message) {
                    case 'INVALID_LOGIN_CREDENTIALS':
                        throw new Error(
                            'Неверная электронная почта или пароль. Попробуйте снова.'
                        );

                    default:
                        throw new Error(
                            'Слишком много попыток входа. Попробуйте позже.'
                        );
                }
            }
        }
    };

    const logOut = () => {
        localStorageService.removeAuthData();
        setCurrentUser(null);
        navigate('/');
    };

    const getUserData = async () => {
        try {
            const { content } = await userService.getCurrentUser();
            const currentUser = content.find(
                c => c._id === localStorageService.getUserId()
            );
            setCurrentUser(currentUser);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ signUp, signIn, logOut, currentUser }}>
            {!isLoading ? children : ''}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
