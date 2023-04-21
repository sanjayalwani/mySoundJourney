import React, { useEffect } from 'react';
import { useAuth } from '../util/auth';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const AuthConfirmation = (props) => {
  const { isLoggedIn, login } = useAuth();

  // Add empty dependency array to only run once on load
  useEffect(() => {
    login();
  }, []);

  if (isLoggedIn) {
    return (<Redirect to='/journey'/>)
  }

  return (
    <p>Confirming details...</p>
  );
}

export default AuthConfirmation;
