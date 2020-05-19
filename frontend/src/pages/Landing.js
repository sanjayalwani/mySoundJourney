import React from 'react';

import './Landing.css'

const Landing = props => {
    return(
        <div className="auth-container">
            <h2 className="auth-container__description">Get started by authorizing yourself with spotify</h2>
            <button className="auth-container__button">CONNECT TO SPOTIFY</button>
        </div>
    );
}

export default Landing;