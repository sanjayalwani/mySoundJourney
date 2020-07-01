import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
//import { AuthContext } from './util/auth-context';
import Navigation from './components/MainUI/Navigation';
//import Login from './util/Login';
import Landing from './pages/Landing';
import Footer from './components/MainUI/Footer';
import Journey from './pages/Journey';

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
var access_token = "";
function App() {
  useEffect(() => {
  if(!isLoggedIn && document.cookie.includes("acc_tok")){
    access_token = document.cookie
      .split(';')
      .find((row) => row.startsWith('acc_tok'))
      .split('=')[1];
    isLoggedIn = true;
  }
  console.log("Mounted");
  return function cleanup(){
    console.log("Cleaning up");
    document.cookie = encodeURIComponent('acc_tok=;');
  }
},[])

  if(!isLoggedIn && document.cookie.includes("acc_tok")){
    access_token = document.cookie
      .split(';')
      .find((row) => row.startsWith('acc_tok'))
      .split('=')[1];
    isLoggedIn = true;
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
    routes = (
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  else{
    routes = (
      <Switch>
          <Route path="/journey" >
            <Journey />
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
        <Navigation />
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
