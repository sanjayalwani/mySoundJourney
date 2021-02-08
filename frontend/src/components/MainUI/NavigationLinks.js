import React from 'react'
import { NavLink } from 'react-router-dom'
import { MDBNav } from "mdbreact";
import './NavigationLinks.css';

const NavigationLinks = props => {
  return  (
    <MDBNav className="navigation-links">
      <NavLink className="py-1" to="/journey">JOURNEY</NavLink>
      <NavLink className="py-1" to="/playlist">PLAYLISTS</NavLink>
    </MDBNav>
  );
}

export default NavigationLinks;