import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import NavProfile from './navProfile';

const NavBar = () => {
    const { currentUser } = useAuth();

    return (
        <nav className="navbar mb-5 bg-primary">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link
                            className="nav-link btn btn-primary text-light"
                            aria-current="page"
                            to="/"
                        >
                            Главная
                        </Link>
                    </li>

                    {currentUser && (
                        <>
                            <li className="nav-item">
                                <Link
                                    className="nav-link btn btn-primary text-light"
                                    aria-current="page"
                                    to="/basket"
                                >
                                    Корзина
                                </Link>
                            </li>

                            {currentUser._id === '657f0101458fdd62dedc4372' && (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link btn btn-primary text-light"
                                        to="/admin"
                                    >
                                        Админ-панель
                                    </Link>
                                </li>
                            )}
                        </>
                    )}
                </ul>

                <div className="d-flex">
                    {currentUser ? (
                        <NavProfile />
                    ) : (
                        <Link
                            className="nav-link py-2 px-3 btn btn-primary text-light"
                            aria-current="page"
                            to="/login"
                        >
                            Вход
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
