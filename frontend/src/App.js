import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Navigation from './components/MainUI/Navigation';
//import Login from './util/Login';
import Landing from './pages/Landing';
import Footer from './components/MainUI/Footer';
import Journey from './pages/Journey';
import Playlists from './pages/PlaylistListing';
import API from './pages/dev/API'
import AuthenticationWall from './components/Authentication/AuthenticationWall';
import AuthConfirmation from './pages/AuthConfirmation';
import { useAuth, AuthProvider } from "./util/auth";

const Routes = () => {
  const { isLoggedIn } = useAuth();
  console.debug(isLoggedIn)

  return (
  <Router>
    <Navigation/>
    <main>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route exact path="/auth/callback">
          <AuthConfirmation />
        </Route>
        <Route exact path="/journey" >
          <AuthenticationWall redirectTo="/">
            <Journey />
          </AuthenticationWall>
        </Route>
        <Route path="/playlist" >
          <AuthenticationWall redirectTo="/">
            <Playlists />
          </AuthenticationWall>
        </Route>
        {/* <Route path="/dev/api" >
          <API />
        </Route> */}
        <Redirect to={isLoggedIn ? '/journey' : '/'} />
      </Switch>
    </main>
    <Footer />
  </Router>
  );
}

function App() {
  return (
      <AuthProvider>
        <Routes />
      </AuthProvider>
  );
}


export default App;
