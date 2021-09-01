const express = require('express');
const bodyParser = require('body-parser');

const { showTalkers } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

/* router.get('/talker/search', );

router.get('/talker/:id', );

router.put('/talker/:id',  );

router.delete('/talker/:id', ); */

app.get('/talker', showTalkers);

// router.post('/talker',  );
// .post('/login');

app.listen(PORT, () => {
  console.log('Online');
});
