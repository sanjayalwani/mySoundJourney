import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import logo from './logo.svg';
import Navigation from './components/Navigation';
import Landing from './pages/Landing';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
