import React from 'react';

import ConnectButton from '../components/Authentication/ConnectButton';
import RerouteButton from '../components/MainUI/RerouteButton';
import { useAuth, AuthProvider } from '../util/auth';

import './Landing.css'

const Landing = (props) => {
  const { isLoggedIn } = useAuth();

  return (
  <div className="auth-container">
    <h2 className="auth-container__description">Get in tune with yourself.</h2>
    {!isLoggedIn && <ConnectButton />}
    {isLoggedIn && <RerouteButton path='/journey' buttonText={"Go to Journey"}/>}
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