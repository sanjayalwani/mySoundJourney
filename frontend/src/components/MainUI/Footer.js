import React from 'react'

import './Footer.css';

const Footer = props => {
	return (
		<footer className="main-footer">
			<span className="main-footer-author">
				© 2020 Sanjay Alwani
			</span>
			<span className="main-footer-nav">
				<span>About</span>
				<span>Feedback</span>
			</span>
		</footer>
	);
}

export default Footer;