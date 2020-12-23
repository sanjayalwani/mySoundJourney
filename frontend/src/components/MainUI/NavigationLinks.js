import React from 'react'
import { NavLink } from 'react-router-dom'

import './NavigationLinks.css';

const NavigationLinks = props => {
    return  (
        <ul className="navigation-links">
            <li>
                <NavLink to="/journey">JOURNEY</NavLink>
            </li>
            <li>
                <NavLink to="/playlist">PLAYLISTS</NavLink>
            </li>
        </ul>
    );
}

export default NavigationLinks;