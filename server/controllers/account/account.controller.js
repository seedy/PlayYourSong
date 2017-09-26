const config = require('../../config.json');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const errorHelper = require('../../helpers/errorHelper.service');
const accountService = require('../../services/account/account.service');

// non-JWT routes
router.post('/login', login);
router.post('/register', register);

// route middleware
router.use(checkJwt);

// JWT secured routes
router.get('/test', testToken);
/*router.get('/:_id', getAccount);
router.put('/:_id', editAccount);
router.delete('/:_id', deleteAccount);
*/
module.exports = router;

/**
 * Login through database via accountService
 * @param req
 * @param res
 */
function login(req, res){
  accountService.authenticate(req.body.identifier, req.body.password)
    .then( (user) => {
      if(user){
        res.send(user);
      } else {
        res.status(401).send('Login attempt failed');
      }
    })
    .catch(errorHelper.respondError(res));
}

/**
 * Register new account into database via accountService
 * @param req
 * @param res
 */
function register(req, res){
  accountService.create(req.body)
    .then( (user) => {
      if(user){
        res.send(user);
      } else {
        res.sendStatus(200);
      }
    })
    .catch(errorHelper.respondError(res));
}

/**
 * DEV ONLY! Test token authenticated request
 * @param req
 * @param res
 */
function testToken(req, res) {
  if(req.decoded){
    res.sendStatus(200);
  }
}

function checkJwt(req, res, next) {
  const auth = req.header('authorization');
  if(auth){
    const reg = /Bearer (.*)/g;
    const token = reg.exec(auth);
    if (token) {
      jwt.verify(token[1], config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send('Failed to authenticate token');
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      return res.status(401).send('No token provided');
    }
  } else {
    return res.status(401).send('No Auth provided');
  }
}
