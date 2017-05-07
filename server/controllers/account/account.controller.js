const config = require('../../config.json');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const errorHelper = require('../../helpers/errorHelper.service');
const accountService = require('../../services/account/account.service');

// routes
router.post('/login', login);
router.post('/register', register);
router.put('/:_id', editAccount);
/*router.get('/:_id', getAccount);
router.delete('/:_id', deleteAccount);
*/
module.exports = router;

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

function register(req, res){
  accountService.create(req.body)
    .then( () => res.sendStatus(200))
    .catch(errorHelper.respondError(res));
}

function editAccount(req, res){
  accountService.update(req.params._id, _.omit(req.body, 'id'))
    .then( () => res.sendStatus(200) )
    .catch(errorHelper.respondError(res));
}
