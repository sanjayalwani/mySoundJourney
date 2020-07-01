const { Router } = require('express');
const request = require('request'); // "Request" library
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const env = require('dotenv');

//Environment variables for local testing To Be Removed when pushing to Heroku
env.config();
if(env.error) throw env.error;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;// Your client id
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const REDIRECT_URI = 'http://localhost:8888/auth/callback'; // Your redirect uri
const stateKey = 'spotify_auth_state'; //This names the cookie for reference

const router = Router();

//Cookie Middleware
router.use(cookieParser());

router.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-top-read user-read-recently-played';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state
    }));
});

router.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/login?' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        let access_token = body.access_token;
        let refresh_token = body.refresh_token;
        res.cookie('acc_tok', access_token);
        // Now we send our tokens to an endpoint that our React app handles
        //MUST CHANGE TO USE JAVASCRIPT WEB TOKEN FOR SECURITY
        res.redirect('http://localhost:8888/journey' /*+
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          })*/);
      } else {
        res.redirect('http://localhost:8888/error?' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

module.exports = router;