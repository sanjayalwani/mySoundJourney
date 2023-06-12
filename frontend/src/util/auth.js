import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'js-cookie';

function generateRandomString(length) {
  // DO NOT EDIT: Specifically constructed to be power of 2 length (2^6 = 64)
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-~';
  
  // Generate `length` random integers in space [0-255]
  let random_uint8s = new Uint8Array(length);
  window.crypto.getRandomValues(random_uint8s);

  // Squish random output domain to map onto our alphabet indices [0-63]
  random_uint8s = random_uint8s.map(x => x / 4);

  // We convert to regular js array for type conversion to string array
  let random_string = Array.prototype.slice.call(random_uint8s);
  random_string = random_string.map(x => alphabet[x]).join('');

  return random_string;
}

async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
}

export function requestLogin() {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;

  let codeVerifier = generateRandomString(128);

  generateCodeChallenge(codeVerifier).then(codeChallenge => {
    let state = generateRandomString(16);
    let scope = 'user-read-private user-top-read user-read-recently-played playlist-read-private';
    
    localStorage.setItem('state', state);
    localStorage.setItem('code_verifier', codeVerifier);

    let args = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });

    window.location = 'https://accounts.spotify.com/authorize?' + args;
  });
}

// This defines the default authentication context
const AuthContext = createContext({
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  login: () => {},
  logout: () => {}
});

export function AuthProvider({ children }){
  let accessTokenCookie = Cookies.get('access_token');
  const [isLoggedIn, setIsLoggedIn] = useState(accessTokenCookie ? true : false);
  const [accessToken, setAccessToken] = useState(accessTokenCookie || '');
  const [refreshToken, setRefreshToken] = useState('');

  const login = () => {
    if (isLoggedIn) return;

    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;

    // Receive code and state
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    let state = urlParams.get('state')

    // Redirect to error page for state mismatch
    if (state !== localStorage.getItem('state')) {
      window.location = process.env.REACT_APP_BASE_URI + '/error';
    }

    let codeVerifier = localStorage.getItem('code_verifier');

    let body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier
    }).toString();
    
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }
        // Check for 200 response before proceeding
        return response.json();
      })
      .then(data => {
        Cookies.set('access_token', data.access_token, { expires: 1 });
        setAccessToken(data.access_token);
        setIsLoggedIn(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoggedIn(false);
      });
  }

  const logout = () => {
    Cookies.remove('access_token');
    setIsLoggedIn(false);
  }

  const ProviderAuthContext = {
    isLoggedIn: isLoggedIn,
    accessToken: accessToken,
    refreshToken: refreshToken,
    login: login,
    logout: logout
  }

  return (
    <AuthContext.Provider value={ProviderAuthContext}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext); 
}
