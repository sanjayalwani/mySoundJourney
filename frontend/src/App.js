import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
//import { AuthContext } from './util/auth-context';
import Navigation from './components/MainUI/Navigation';
//import Login from './util/Login';
import Landing from './pages/Landing';
import Footer from './components/MainUI/Footer';
import Journey from './pages/Journey';
import Overview from './pages/Overview';

//Add Oauth here with contextual routing based on authorization ( has access token )
//If !auth then redirect to "/auth" which contains landing page
//If auth then 
//default is "/" for recent tracks called JOURNEY
//path "/top" is modified by "/artists" or "/tracks" called TOP 50
//path "/saved" is modified by playlists albums artists songs etc. called SAVED

//function useQuery() {
//  return new URLSearchParams(useLocation().search);
//}
var isLoggedIn = false;
console.log("isloggedin reinit")
var access_token = "";
function App() {
                                                                //Cookies expire after 1 hour

  if(document.cookie.includes("acc_tok")){                      //If the cookie exists it hasn't expired
    access_token = document.cookie                                //  So we're 'logged in'
      .split(';')
      .find((row) => row.startsWith('acc_tok'))
      .split('=')[1];
    isLoggedIn = true;
    console.log("acc_tok exists");
  } else {                                                      //If cookie is gone, hopefully when expired
    isLoggedIn = false;                                         //  We're not 'logged in'
    console.log("acc_tok not found in cookie: " + document.cookie);
  }


  /*
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const login = useCallback((access_t, refresh_t) => {
    setIsLoggedIn(true);
    setAccessToken(access_t);
    setRefreshToken(refresh_t);
  }, []);
  
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setAccessToken('');
    setRefreshToken('');
  }, []);
  */
  let routes;

  if( !isLoggedIn ){
    console.log("Checking the isLoggedIn variable");
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
    console.log("Passed the isLoggedIn variable");
    routes = (
      <Switch>
          <Route path="/journey" >
            <Journey />
          </Route>
          <Route path="/overview" >
            <Overview />
          </Route>
          <Route path="/top/tracks" >
            <Journey />
          </Route>
          <Route path="/top/artists" >
            <Journey />
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
