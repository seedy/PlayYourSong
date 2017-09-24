const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const cors = require('cors');
const bodyParser = require('body-parser');

// retrieve secret
const sessionId = require('./secret/server').sessionID;

// retrieve controllers
const account = require('./server/controllers/account/account.controller.js');

const app = express();

// session
app.use(session({
  secret: sessionId,

  name: 'sessionId'
}));

// cors
app.use(cors());

// csrf protection
//app.use(csrf());

// POST parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set our api routes
app.use('/account', account);


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3002';

/**
 * Start HTTP server and listen
 */
const server = app.listen(port, () => {
  console.log('Server listening on port ' + port);
});

