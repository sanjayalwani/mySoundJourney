/*
* MySoundJourney
* Sanjay Alwani 2020
*
* Backend adopted from https://github.com/spotify/web-api-auth-examples/tree/master/authorization_code
*/

const express = require('express'); // Express web server framework
const path = require('path');
const authRouter = require('./auth');

const PORT = process.env.PORT || 5000;

const app = express();

// Built React frontend served here
app.use(express.static(__dirname + '/frontend/build'))

// Authentication handler
app.use('/auth', authRouter);

// The "catchall" handler: for any endpoint not caught in frontend, send back the root index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

app.listen(PORT);
console.log(`Listening on ${PORT}`);
