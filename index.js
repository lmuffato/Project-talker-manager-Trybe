const express = require('express');
const bodyParser = require('body-parser');
const midllewares = require('./midlleware');
const { 
  validateToken, 
  validateName, 
  validateAge, 
  validateTalk,
  validateWatchedRate,
} = require('./validateNewSpeaker/index');
const login = require('./login');

const { fsTalker, fsWriteTalker } = require('./fetchTalker/fsTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const talkersData = 'talker.json';

// Rota get retorna busca com algum termo no nome, caso não informe nada retorna a lista toda
app.get('/talker/search',
  validateToken,
  midllewares.searchTerm,
  async (req, res) => {
    const { q: searchTerm } = req.query;
    let data = [];

    try {
      data = await fsTalker(talkersData);
    } catch (err) {
      console.log(err);
    }

    const result = data.filter((talker) => talker.name.includes(searchTerm));

    if (result.length === 0) {
      return res.status(200).json(result);
    }

    return res.status(200).json(result);
  });

// Rota get retorna lista completa
app.get('/talker', (req, res) => {
  fsTalker(talkersData)
    .then((resolve) => res.status(200).json(resolve))
    .catch((_err) => res.status(200).json([]));
});

// Rota get retorna id especifico
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  fsTalker(talkersData)
    .then((result) => {
      const findSpeaker = result.find((speaker) => speaker.id === Number(id));
      if (!findSpeaker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
      res.status(200).json(findSpeaker);
    });
  });

// Rota que gera um token e valida login
app.post('/login', login.validateLogin, (_req, res) => {
  res.status(200).json({
    token: `${midllewares.token()}`,
  });
});

// Validação do tokek para todas as rotas
app.use(validateToken);

// Rota para cadastro de um novo palestrante
app.post('/talker', 
  validateName, 
  validateAge, 
  validateTalk,
  validateWatchedRate,
  async (req, res) => {
  const newSpeaker = req.body;

  const dataTalker = await fsTalker(talkersData);

  newSpeaker.id = dataTalker.length + 1;
  const newDataTalker = JSON.stringify([...dataTalker, newSpeaker]);
  
  try {
    await fsWriteTalker(talkersData, newDataTalker);
    return res.status(201).json(newSpeaker);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// Rota para alteração de um palestrante
app.put('/talker/:id', 
  validateName, 
  validateAge, 
  validateTalk,
  validateWatchedRate,
  async (req, res) => {
  const { id: returnId } = req.params;
  const newTalker = req.body;
  const data = await fsTalker(talkersData);
  const newData = data.map((talker) => {
    if (talker.id === Number(returnId)) {
      return { ...talker, ...newTalker };
    }
    return talker;
  });

  try {
    await fsWriteTalker(talkersData, JSON.stringify(newData));
    return res.status(200).json({ ...newTalker, id: Number(returnId) });
  } catch (err) {
    return res.status(400).json(err);
  }
 });

// Rota para deletar um palestrante
 app.delete('/talker/:id', async (req, res) => {
  const { id: deleteId } = req.params;

  const data = await fsTalker(talkersData);
  const deleteData = data.filter(({ id }) => id !== Number(deleteId));

  try {
    await fsWriteTalker(talkersData, JSON.stringify(deleteData));
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    return res.status(400).json(err);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
