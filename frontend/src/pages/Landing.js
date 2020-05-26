import React from 'react';
import { Link } from 'react-router-dom';

import './Landing.css'

const Landing = props => {
    return(
        <div className="auth-container">
            <h2 className="auth-container__description">Get started by authorizing yourself with Spotify</h2>
            <Link className="auth-container__button" to="/journey">CONNECT TO SPOTIFY</Link>
        </div>
    );
}

export default Landing;