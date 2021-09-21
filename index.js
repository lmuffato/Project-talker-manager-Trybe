const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('Hello World 🚀👩‍🚀');
});

app.listen(PORT, () => {
  console.log(`We are running and ready to rock on ${PORT}`);
});
