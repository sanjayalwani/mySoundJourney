import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
    
const Login = props => {
    let query = useQuery();

    if( query.get("error") ){
        console.log("ERROR FOUND");
        return (<Redirect to="/" />);
    }
    //No error
    let access_token = query.get("access_token") || null;
    let refresh_token = query.get("refresh_token") || null;
    if( access_token && refresh_token ){
        console.log("LOGGED IN");
        setTimeout(() => props.login(access_token, refresh_token), 150);
    } 
    return (<Redirect to="/" />);
}

export default Login;