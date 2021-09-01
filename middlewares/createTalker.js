const {
  nameValidator,
  ageValidator,
  talkValidator,
} = require('../utils/createTalkerValidator');

/* function createTalker(request, response, next) {
  nameCheck = nameValidator();
  ageCheck = ageValidator();
  talkCheck = talkValidator();

  if (nameCheck === 0) {
    return next();
  }
  
  if (ageCheck === 0) {
    return next();
  }
  if (talkCheck === 0) {
    return next();
  }
} */

function nameCheck (request, response, next) {
  const { name } = request.body;
  const validated = nameValidator(name);
  if ( validated === 0) {
    return next();
  }
  return response.status(400).send(validated);
}

function ageCheck (request, response, next) {
  const { age } = request.body;
  const validated = ageValidator(age);
  if ( validated === 0) {
    return next();
  }
  return response.status(400).send(validated);
}

function talkCheck (request, response, next) {
  const { talk } = request.body;
  const validated = nameValidator(talk);
  if ( validated === 0) {
    return next();
  }
  return response.status(400).send(validated);
}

module.exports = {
  nameCheck,
  ageCheck,
  talkCheck,
};
