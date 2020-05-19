import React from 'react'

import './Navigation.css';

const Navigation = props => {
	return (
		<header className="navigation">
			<span className="navigation-title">
				mySoundJourney
			</span>
			<span className="navigation-shoutout">
				powered <span role="img" aria-label="!">💪🏽</span> by Spotify® API
			</span>
		</header>
	);
}

export default Navigation;