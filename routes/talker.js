const express = require('express');
const fs = require('fs').promises;

const talkerRouter = express.Router();
const HTTP_OK_STATUS = 200;

talkerRouter.get('/', async (_request, response) => {
  const data = await fs.readFile('talker.json');
  response.status(HTTP_OK_STATUS).send(JSON.parse(data));
});

module.exports = talkerRouter;