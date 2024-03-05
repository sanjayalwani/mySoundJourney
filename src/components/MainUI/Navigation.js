import React from 'react'
import { useAuth } from '../../util/auth';

import './Navigation.css';

const Navigation = () => {
  const { isLoggedIn, logout } = useAuth();
	
  // Conditionally load navbar based on authentication context
  let myJSX = (<span className="navigation-shoutout">powered <span role="img" aria-label="!">💪🏽</span> by Spotify® Web API</span>);

  if (isLoggedIn) {
    myJSX = (<a className="navigation-logout" onClick={logout}>LOG OUT</a>);
  }

	return (
		<header className="navigation">
			<span className="navigation-title">
				mySoundJourney
			</span>
			{myJSX}
		</header>
	);
}

export default Navigation;