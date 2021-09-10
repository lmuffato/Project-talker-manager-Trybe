const express = require('express');

const rescue = require('express-rescue');

const router = express.Router();
const talkerMiddle = require('./controllers/talkerController');
const auth = require('./controllers/auth');
const validation = require('./controllers/validation');

router.get('/talker', talkerMiddle.talkerRoute);
router.get('/talker/:id', talkerMiddle.searchID);
router.post('/login', auth.validateEmail, auth.validatePWD, auth.validateToken);
router.post(
  '/talker',
  validation.validationToken,
  validation.validationName,
  validation.validationAge,
  validation.validateTalk,
  validation.validateDate,
  validation.validateRate,
  validation.createTalk,
);

router.put(
  '/talker/:id',
  validation.validationToken,
  validation.validationName,
  validation.validationAge,
  validation.validateTalk,
  validation.validateDate,
  validation.validateRate,

  rescue(async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;

    const tlkData = await talkerMiddle.lerArquivo();
    const findTalkrs = tlkData.findIndex((tlk) => tlk.id === parseInt(id, 10));
    tlkData[findTalkrs] = {
      ...tlkData[findTalkrs],
      id: parseInt(id, 10),
      name,
      age,
      talk,
    };
    await talkerMiddle.escreverArquivo(tlkData);
    res.status(200).json({ id: parseInt(id, 10), name, age, talk });
  }),
);

router.delete(
  '/talker/:id',
  validation.validationToken,
  rescue(async (req, res) => {
    const { id } = req.params;

    const tlkData = await talkerMiddle.lerArquivo();
    const findTalkrs = tlkData.findIndex((tlk) => tlk.id === parseInt(id, 10));
    tlkData.splice(findTalkrs, 1);
    await talkerMiddle.escreverArquivo(tlkData);

    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  }),
);

module.exports = router;
