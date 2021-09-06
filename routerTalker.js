const fs = require('fs');
const express = require('express');

const talker = './talker.json';
const router = express.Router();
const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;

// requisito 1
router.get('/', (_request, response) => {
  const dataTalker = JSON.parse(fs.readFileSync(talker));
  if (dataTalker.length === 0) return response.status(HTTP_OK_STATUS).json([]);
  return response.status(HTTP_OK_STATUS).json(dataTalker);
});

//  requisito 2
router.get('/:id', (request, response) => {
  const { id } = request.params;
  const dataTalker = JSON.parse(fs.readFileSync(talker));
  const findTalker = dataTalker.find((elem) => elem.id === parseInt(id, 10));
  if (!findTalker) {
    return response.status(HTTP_ERROR_STATUS)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(HTTP_OK_STATUS).json(findTalker);
});

module.exports = router;
