const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// retrieve controllers
const account = require('./server/controllers/account/account.controller.js');

const app = express();

// cors
app.use(cors());

// POST parsers
app.use(bodyParser.json());

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

