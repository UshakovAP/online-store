import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AdminPanelRoute = ({ component: Component, children, ...props }) => {
    const { currentUser } = useAuth();

    if (currentUser._id !== '657f0101458fdd62dedc4372') {
        return (
            <Navigate
                to={{
                    pathname: '/',
                    state: {
                        from: props.location,
                    },
                }}
            />
        );
    }

    return <>{Component ? <Component {...props} /> : children}</>;
};

export default AdminPanelRoute;
