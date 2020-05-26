import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Navigation from './components/MainUI/Navigation';
import Landing from './pages/Landing';
import Footer from './components/MainUI/Footer';
import Journey from './pages/Journey';

//Add Oauth here with contextual routing based on authorization ( has access token )
//If !auth then redirect to "/auth" which contains landing page
//If auth then 
//default is "/" for recent tracks called JOURNEY
//path "/top" is modified by "/artists" or "/tracks" called TOP 50
//path "/saved" is modified by playlists albums artists songs etc. called SAVED

function App() {
  return (
    <Router>
      <Navigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/journey" >
            <Journey />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
