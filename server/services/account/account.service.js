const config = require('../../config.json');
const errorHelper = require('../../helpers/errorHelper.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const Q = require('q');
const mongo = require('mongoskin');
const db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

const service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.remove = remove;

module.exports = service;

function authenticate(identifier, password) {
  const deferred = Q.defer();

  db.users.findOne(
    { $or: [
      {username: identifier},
      {email: identifier}
      ]
    }, function (err, user) {
    if (err){
      deferred.reject(errorHelper.generateError(err.name + ': ' + err.message, 500));
    }

    if (user && bcrypt.compareSync(password, user.hash)) {
      // authentication successful
      deferred.resolve({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: jwt.sign({ sub: user._id }, config.secret)
      });
    } else {
      // authentication failed
      deferred.resolve();
    }
  });

  return deferred.promise;
}

function getAll() {
  const deferred = Q.defer();

  db.users.find().toArray(function (err, users) {
    if (err) deferred.reject(errorHelper.generateError(err.name + ': ' + err.message, 500));

    // return users (without hashed passwords)
    users = users.map((user) => {
      return _.omit(user, 'hash');
    });

    deferred.resolve(users);
  });

  return deferred.promise;
}

function getById(_id) {
  const deferred = Q.defer();

  db.users.findById(_id, function (err, user) {
    if (err) deferred.reject(errorHelper.generateError(err.name + ': ' + err.message, 500));

    if (user) {
      // return user (without hashed password)
      deferred.resolve(_.omit(user, 'hash'));
    } else {
      // user not found
      deferred.resolve();
    }
  });

  return deferred.promise;
}

function create(userParam) {
  const deferred = Q.defer();

  // validation
  db.users.findOne(
    { $or: [
      {username: userParam.username},
      {email: userParam.email}
    ]
    },
    function (err, user) {
      if (err) deferred.reject(errorHelper.generateError(err.name + ': ' + err.message, 500));

      if (user) {
        // user already exists
        let message = 'User with ';
        if(user.username === userParam.username) message += 'username "'+ userParam.username + '" ';
        if(user.email === userParam.email) message += 'email "' + userParam.email + '" ';
        message += 'already exists';
        deferred.reject(errorHelper.generateError(message, 409));
      } else {
        createUser();
      }
    });

  function createUser() {
    // set user object to userParam without the cleartext password
    const user = _.omit(userParam, 'password');
    // add hashed password to user object
    user.hash = bcrypt.hashSync(userParam.password, 10);

    db.users.insert(
      user,
      function (err, doc) {
        if (err) deferred.reject(errorHelper.generateError(err.name + ': ' + err.message, 500));

        deferred.resolve();
      });
  }

  return deferred.promise;
}

function update(_id, userParam) {
  const deferred = Q.defer();

  // validation
  db.users.findById(_id, function (err, user) {
    if (err) deferred.reject(errorHelper.generateError(err.name + ': ' + err.message, 500));

    if (user.username !== userParam.username) {
      // username has changed so check if the new username is already taken
      db.users.findOne(
        { username: userParam.username },
        function (err, user) {
          if (err) deferred.reject(errorHelper.generateError(err.name + ': ' + err.message, 500));

          if (user) {
            // username already exists
            deferred.reject(errorHelper.generateError('Username "' + req.body.username + '" is already taken', 409));
          } else {
            updateUser();
          }
        });
    } else {
      updateUser();
    }
  });

  function updateUser() {
    // fields to update
    const set = {
      username: userParam.username,
      email: userParam.email
    };

    // update password if it was entered
    if (userParam.password) {
      set.hash = bcrypt.hashSync(userParam.password, 10);
    }

    db.users.update(
      { _id: mongo.helper.toObjectID(_id) },
      { $set: set },
      function (err, doc) {
        if (err) deferred.reject(errorHelper.generateError(err.name + ': ' + err.message, 500));

        deferred.resolve();
      });
  }

  return deferred.promise;
}

function remove(id) {
  const deferred = Q.defer();

  db.users.remove(
    { id: mongo.helper.toObjectID(id) },
    function (err) {
      if (err) deferred.reject(errorHelper.generateError(err.name + ': ' + err.message, 500));

      deferred.resolve();
    });

  return deferred.promise;
}
