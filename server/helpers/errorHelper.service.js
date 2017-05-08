const service = {};

service.generateError = generateError;
service.internalServerError = internalServerError;
service.respondError = respondError;
module.exports = service;

// error object generation + adding code
function generateError(message, httpCode) {
  let error = new Error(message);
  error.status = httpCode;

  return error;
}

// specific error generation for internal server errors
function internalServerError(message) {
  let error = new Error(message);
  error.status = 500;

  return error;
}

function respondError(res) {
  return function(error){
    return res.status(error.status || 500).send(error.message);
  }
}
