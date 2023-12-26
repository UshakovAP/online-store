import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, children, ...props }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return (
            <Navigate
                to={{
                    pathname: '/login',
                    state: {
                        from: props.location,
                    },
                }}
            />
        );
    }

    return <>{Component ? <Component {...props} /> : children}</>;
};

export default ProtectedRoute;
