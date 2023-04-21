import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../util/auth';

function AuthenticationWall({ children, redirectTo }) {
    const currentAuthContext = useAuth();
    return currentAuthContext['isLoggedIn'] ? children : <Redirect to={redirectTo} />;
}

export default AuthenticationWall;
