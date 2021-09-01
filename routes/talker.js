/* https://github.com/RenzoSev 
    My friend, Renzo Sevilla, helped me organize and understand how routes work on NodeJS.
*/
const express = require('express');
const fs = require('fs');

const router = express.Router();

const {
  validateToken,
  validateName,
  validateAge,
  existsTalkKeys,
  existsTalkInfos,
  validateTalkInfos,
  createTalker,
} = require('../middlewares/createNewTalker');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const NOT_FOUND_STATUS = 404;
// getTalkerById
router.get(
  '/:id',
  (request, response) => {
    const { id } = request.params;
    const data = fs.readFileSync('./talker.json', { encoding: 'utf-8' });
    const jsonData = JSON.parse(data);
    const talker = jsonData.find((person) => +id === person.id);
    if (!talker) {
      return response
        .status(NOT_FOUND_STATUS)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
    response.status(HTTP_OK_STATUS).json(talker);
  },
);

// getAllTalkers
router.get('/', (_request, response) => {
  const data = fs.readFileSync('./talker.json', { encoding: 'utf-8' });
  const jsonData = JSON.parse(data);
  response.status(HTTP_OK_STATUS).json(jsonData);
});

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  existsTalkKeys,
  existsTalkInfos,
  validateTalkInfos,
  createTalker,
  (request, response) => {
    const { name, age, talk } = request.body;
    const { userId: id } = request;
    return response
      .status(HTTP_CREATED_STATUS)
      .json({
        id,
        name,
        age,
        talk,
      });
  },
);

module.exports = router;