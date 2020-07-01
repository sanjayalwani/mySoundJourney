import React from 'react';

import './Landing.css'

const Landing = props => {
    const BASE_URL = document.location.href;
    return(
        <div className="auth-container">
            <h2 className="auth-container__description">Get started by authorizing yourself with Spotify</h2>
            <a className="auth-container__button" href={`${BASE_URL}auth/login`}>CONNECT TO SPOTIFY</a>
        </div>
    );
}

export default Landing;