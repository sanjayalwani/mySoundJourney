import React from 'react';

import './Landing.css'

const Landing = props => {
    const BASE_URL = "";//document.location.href;
    return(
        <div className="auth-container">
            <h2 className="auth-container__description">Get in tune with yourself.</h2>
            <a className="auth-container__button" href="http://127.0.0.1:5000/auth/login">CONNECT TO SPOTIFY</a>
            <hr />
            <h2>
                Ever been impressed by a song recommended to you on Spotify?
            </h2>
            <br></br>
            <h3 className="msj-features">
                mySoundJourney features
                <ul className="msj-features_list">
                    <li>Recent track history</li>
                    <li>Energy charts</li>
                    <li>Positivity charts</li>
                    <li>... and more in development!</li>
                </ul>
            </h3>
            
        </div>
    );
}

export default Landing;