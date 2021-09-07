const express = require('express');
const bodyParser = require('body-parser');
const { reading, writing, tokenGenerator } = require('./Util/util');

const { HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS, HTTP_BAD_REQUEST_STATUS, HTTP_CREATED_STATUS,
} = require('./HTTP_verbs/http_verbs');

const { validationToken, validationName, validationEmail, validationPassWord, validationAge,
  validationWatchedAt,
  validationTalk,
  validationRates,
} = require('./Validations/validations');

const fileTalkers = 'talker.json';

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// --------------------------------------------------- Quesito 01 ---------------------------------------------

app.get('/talker', async (_req, res) => {
  try {
    const talker = await reading(fileTalkers);
    if (!talker) return res.status(HTTP_OK_STATUS).send([]);
    res.status(HTTP_OK_STATUS).send(talker);
  } catch (_e) {
    return null;
  }
});

// --------------------------------------------------- Quesito 02 ----------------------------------------------------------------------
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const talker = await reading(fileTalkers);
    const talke = talker.find((t) => t.id === +id);

    if (!talke) {
      return res.status(HTTP_NOT_FOUND_STATUS)
        .send({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(HTTP_OK_STATUS).send(talke);
  } catch (_e) {
    return null;
  }
});

// -------------------------------------------- Quesito 03 -----------------------------------------------------------------------------
// Referencia para a criação do tolken: https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const verificationEmail = validationEmail(email);
  const verificationPassword = validationPassWord(password);

  try {
    if (verificationEmail !== null) {
      return res.status(HTTP_BAD_REQUEST_STATUS).send({ message: verificationEmail });
    }

    if (verificationPassword !== null) {
      return res.status(HTTP_BAD_REQUEST_STATUS).send({ message: verificationPassword });
    }

    res.status(HTTP_OK_STATUS).json({ token: tokenGenerator() });
  } catch (_e) {
    return null;
  }
});

// --------------------------------------------- Quesito 04 ---------------------------------------------------------------------------

app.post('/talker',
validationToken,
validationName,
validationAge,
validationTalk,
validationWatchedAt,
validationRates,
 async (req, res) => {
  const talker = await reading(fileTalkers);
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const newTalke = { id: talker.length + 1, name, age, talk: { watchedAt, rate } };
  talker.push(newTalke);

  try {
    await writing(talker);
    res.status(HTTP_CREATED_STATUS).json(newTalke);
  } catch (_e) {
    return null;
  }
});

// --------------------------------------------- Quesito 05 ---------------------------------------------------------------------------

app.put('/talker/:id',
validationToken,
validationName,
validationAge,
validationTalk,
validationWatchedAt,
validationRates,
 async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = await reading(fileTalkers);
  const { id } = req.params;
  const talkerToEdit = {
    id: Number(id),
    name,
    age,
    talk,
  };
  talker.filter((talke) => Number(talke.id) !== Number(id));
  talker.push(talkerToEdit);

  try {
    await writing(talker);
    res.status(HTTP_OK_STATUS).json(talkerToEdit);
  } catch (_e) {
    return null;
  }
});

// --------------------------------------------- Quesito 06 ---------------------------------------------------------------------------

app.delete('/talker/:id', validationToken, async (req, res) => {
  const talker = await reading(fileTalkers);
  const { id } = req.params;
  
  const newArray = talker.filter((talke) => Number(talke.id) !== Number(id));

  try {
    await writing(newArray);
    res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (_e) {
    return null;
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
