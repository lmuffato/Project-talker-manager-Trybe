const fs = require('fs');

const bodyParser = require('body-parser');
const express = require('express');
const middleware = require('./schemas');
const { TokenGenerator } = require('./TokenGenerator/TokenGenerator');
const M = require('./Messages/Messages');

// const M = require('./messages.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const getTalkerJSON = () => JSON.parse(fs.readFileSync('talker.json', 'utf8'));

app.get('/talker', (_req, res) => {
  try {
    const talkers = getTalkerJSON();
    res.status(200).send(talkers);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/talker/search', middleware.validationAndRegexToken, (req, res, next) => {
  try {
    const talkers = getTalkerJSON();
    const desiredTalker = req.query.q;

    if (!desiredTalker) return next();

    const matches = talkers.filter((talker) => {
      const insensitiveName = talker.name.toLowerCase();
      const insensitiveQuery = desiredTalker.toLowerCase();

      return insensitiveName.includes(insensitiveQuery);
    });

    return res.status(200).json(matches);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.post('/login', middleware.loginValidation, (_req, res) => {
  const token = TokenGenerator();
  res.status(200).send({ token });
});

app.post(
  '/talker',
  middleware.validationAndRegexToken,
  middleware.nameAndAgeValidation,
  middleware.validateTalkPayload,
  middleware.validateRateAndWatchedatPayload,
  (req, res) => {
    try {
      const talkers = getTalkerJSON();
      const newTalker = req.body;
      newTalker.id = talkers.length + 1;
      talkers.push(newTalker);

      fs.writeFileSync('talker.json', JSON.stringify(talkers));

      res.status(201).json(newTalker);
    } catch (err) {
      return res.status(500).send({ err });
    }
  },
);

app.get('/talker/:id', (req, res) => {
  try {
    const talkers = getTalkerJSON();
    const idParam = parseInt(req.params.id, 10);
    const person = talkers.find((talker) => talker.id === idParam);

    if (person) return res.status(200).send(person);

     return res.status(404).send({ message: M.NOT_FOUND_PERSON });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.put(
  '/talker/:id',
  middleware.validationAndRegexToken,
  middleware.nameAndAgeValidation,
  middleware.validateTalkPayload,
  middleware.validateRateAndWatchedatPayload,

  (req, res) => {
    try {
      const talkers = getTalkerJSON();
      const DATA = req.body;
      const talkerIdUpdate = parseInt(req.params.id, 10);
      DATA.id = talkerIdUpdate;      
      const updatedTalkers = talkers.map((talker) => {
        if (talker.id === (talkerIdUpdate)) {
          return { ...DATA };
        }
        return talker;
      });
      fs.writeFileSync('talker.json', JSON.stringify(updatedTalkers));
      res.status(200).json(DATA);
    } catch (err) {
      return res.status(500).send({ err });
    }
  },
);
 // Não entendo o porquê desta função não ser executada??
 // const updatedTalkers = talkers.map((t) => t.id).includes(talkerIdUpdate)
      //   ? { ...DATA }
      //   : { ...talkers };

app.delete('/talker/:id', middleware.validationAndRegexToken, (req, res) => {
  try {
    const talkers = getTalkerJSON();
    const deleteId = parseInt(req.params.id, 10);
    const newTalkers = talkers.filter((talker) => talker.id !== deleteId);

    fs.writeFileSync('talker.json', JSON.stringify(newTalkers));

    res.status(200).json({ message: M.DELETED_PERSON_SUCESS });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
