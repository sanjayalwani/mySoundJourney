const { Router } = require("express");
const request = require("request"); // "Request" library
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

//Environment variables for local testing To Be Removed when pushing to Heroku
if (process.env.NODE_ENV != "production") {
  console.log(`Not in production: in ${process.env.NODE_ENV || "local dev"}`);
  const env = require("dotenv");
  env.config();
  if (env.error) throw env.error;
}

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID; // Your client id
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const REDIRECT_URI = process.env.REDIRECT_URI; // Your redirect uri
const stateKey = "spotify_auth_state"; // This names the cookie for reference
const accessKey = "acc_tok"; // Cookie key - Cookey

const router = Router();

//Cookie Middleware
router.use(cookieParser());

router.get("/login", function (req, res) {
  console.log("Login requested");
  if (req.query.hasOwnProperty("error")) {
    res.clearCookie(stateKey);
    //The client will do the notification logic (if any)
  }
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope =
    "user-read-private user-top-read user-read-recently-played playlist-read-private";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state,
      })
  );
});

router.get("/logout", function (req, res) {
  console.log("Cookie cleared");
  res.clearCookie(accessKey);
  res.redirect("/");
});

router.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/login?" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      },
      json: true,
    };
    console.log("Posting now");
    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token;
        let refresh_token = body.refresh_token; //We don't use this, yet
        res.cookie(accessKey, access_token, { maxAge: 3600000 }); //1 hour token
        console.log("Granted cookie");
        // Now we send our tokens to an endpoint that our React app handles
        //MUST CHANGE TO USE JAVASCRIPT WEB TOKEN FOR SECURITY, perhaps
        res.redirect(
          "/journey" /*+
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          })*/
        );
      } else {
        console.log("There was an error");
        res.redirect(
          "/error?" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

module.exports = router;
