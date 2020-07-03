/*
*MySoundJourney
*Sanjay Alwani 2020
*
*Backend heavily adopted https://github.com/spotify/web-api-auth-examples/tree/master/authorization_code
*/

const express = require('express'); // Express web server framework
const path = require('path');
const authRouter = require('./auth');

const PORT = process.env.PORT || 5000;

const app = express();

//Public directory, frontend goes here
app.use(express.static(__dirname + '/frontend/build'))

app.use('/auth', authRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file. - Dave Ceddia
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
  });


app.listen(PORT);
console.log(`Listening on ${PORT}`);