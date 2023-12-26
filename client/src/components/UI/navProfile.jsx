import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn btn-primary dropdown-toggle d-flex align-items-center">
                <div className="me-2 text-light">{currentUser.email}</div>
            </div>
            <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
                <Link className="dropdown-item" to="/logout">
                    Выход
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
