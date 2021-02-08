import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
//import { AuthContext } from './util/auth-context';
import Navigation from './components/MainUI/Navigation';
//import Login from './util/Login';
import Landing from './pages/Landing';
import Footer from './components/MainUI/Footer';
import Journey from './pages/Journey';
import Playlists from './pages/PlaylistListing';
import API from './pages/dev/API'

//function useQuery() {
//  return new URLSearchParams(useLocation().search);
//}
var isLoggedIn = false;
//console.log("isloggedin reinit")
var access_token = "";
function App() {
                                                                //Cookies expire after 1 hour

  if(document.cookie.includes("acc_tok")){                      //If the cookie exists it hasn't expired
    access_token = document.cookie                                //  So we're 'logged in'
      .split(';')
      .find((row) => row.startsWith('acc_tok'))
      .split('=')[1];
    isLoggedIn = true;
    //console.log("acc_tok exists");
  } else {                                                      //If cookie is gone, hopefully when expired
    isLoggedIn = false;                                         //  We're not 'logged in'
    //console.log("acc_tok not found in cookie: " + document.cookie);
  }


  let routes;
  // isLoggedIn=true;
  if( !isLoggedIn ){
    routes = (
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  else {
    routes = (
      <Switch>
          <Route exact path="/journey" >
            <Journey />
          </Route>
          <Route exact path="/playlist" >
            <Playlists />
          </Route>
          <Route path="/playlist/:id" >
            
          </Route>
          <Route path="/dev/api" >
            <API />
          </Route>
          <Redirect to="/journey" />
      </Switch>
    );
  }

  return (
      <Router>
        <Navigation isLoggedIn={isLoggedIn}/>
        <main>
          {routes}
        </main>
        <Footer />
      </Router>
  );
}

/*const Login = props => {
  let auth = useContext(AuthContext);
  let query = useQuery();
  
  if( query.get("error") ){
      console.log("ERROR FOUND");
      return (<Redirect to="/" />);
  }
  //No error
  let access_token = query.get("access_token") || null;
  let refresh_token = query.get("refresh_token") || null;
  if( access_token && refresh_token ){
      console.log("LOGGED IN");
      setTimeout(()=>auth.login(access_token, refresh_token),1000);
  } 
  return (<Redirect to="/" />);
}*/

export default App;
