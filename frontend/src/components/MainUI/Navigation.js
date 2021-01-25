import React from 'react'

import './Navigation.css';

const Navigation = props => {
	let myJSX;
	if(props.isLoggedIn===true){
		myJSX = (<a className="navigation-logout" href="/auth/logout">LOG OUT</a>);
	} else {
		myJSX = (<span className="navigation-shoutout">powered <span role="img" aria-label="!">💪🏽</span> by Spotify® Web API</span>);
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