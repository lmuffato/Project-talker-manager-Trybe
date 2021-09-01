const {
  nameValidator,
  ageValidator,
  talkValidator,
} = require('../utils/createTalkerValidator');

const { readJsonReturnArray } = require('../utils/read');
const { writeAnObjectIntoAJSONFile } = require('../utils/write');

function nameCheck(request, response, next) {
  const { name } = request.body;
  const validated = nameValidator(name);
  if (validated === 0) {
    return next();
  }
  return response.status(400).send(validated);
}

function ageCheck(request, response, next) {
  const { age } = request.body;
  const validated = ageValidator(age);
  if (validated === 0) {
    return next();
  }
  return response.status(400).send(validated);
}

function talkCheck(request, response, next) {
  const { talk } = request.body;
  const validated = talkValidator(talk);
  if (validated === 0) {
    return next();
  }
  return response.status(400).send(validated);
}

async function registerTalker(request, response) {
  const { name, age, talk } = request.body;
  const talkerDBPath = './talker';
  const talkerDB = await readJsonReturnArray(talkerDBPath);
  const id = talkerDB.length + 1;
  const talkerToAdd = {
    name,
    age,
    talk,
    id,
  };

  talkerDB.push(talkerToAdd);
  await writeAnObjectIntoAJSONFile(talkerDB);
  return response.status(201).json(talkerToAdd);
}

module.exports = {
  nameCheck,
  ageCheck,
  talkCheck,
  registerTalker,
};
