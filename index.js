const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const fileTalker = fs.readFileSync('./talker.json');
const talkerJSON = JSON.parse(fileTalker);
const PORT = process.env.PORT || 3000;
const HTTP_OK_STATUS = 200;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.listen(PORT, () => console.log('Online na porta: %s', PORT));

/**
 * ENDPOINTS
 */
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  res.send(talkerJSON);
});

app.get('/talker/:id', () => {});

app.post('/login', () => {});

app.post('/talker', () => {});

app.put('/talker/:id', () => {});

app.delete('/talker/:id', () => {});

app.get('/talker/search?q=searchTerm', () => {});