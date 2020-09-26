import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    access_token: '',
    refresh_token: '',
    login: () => {},
    logout: () => {}
});