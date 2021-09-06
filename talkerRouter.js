const fs = require('fs').promises;
const express = require('express');

const FILE = './talker.json';

const router = express.Router();

const verificaToken = (token) => {
  if (!token) {
    const err = new Error('Token não encontrado'); 
    err.code = 401;
    throw err;
  }

  if (token === '' || token.length < 16) {
    const err = new Error('Token inválido'); 
    err.code = 401;
    throw err;
  }

  return true;
};

const verificaNome = (name) => {
  if (!name || name === '') {
    const err = new Error('O campo "name" é obrigatório');
    err.code = 400;
    throw err;
  }

  if (name.length < 3) {
    const err = new Error('O "name" deve ter pelo menos 3 caracteres');
    err.code = 400;
    throw err;
  }
};

const verificaIdade = (age) => {
  if (!age) {
    const err = new Error('O campo "age" é obrigatório');
    err.code = 400;
    throw err;
  }

  if (age < 18) {
    const err = new Error('A pessoa palestrante deve ser maior de idade');
    err.code = 400;
    throw err;
  }
};

const verificaWatchedAt = (watchedAt) => {
  if (!/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/.test(watchedAt)) {
    const err = new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
    err.code = 400;
    throw err;
  }
};

const verificaRate = (rate) => {
  if (rate < 1 || rate > 5 || typeof rate !== 'number') {
    const err = new Error('O campo "rate" deve ser um inteiro de 1 à 5');
    err.code = 400;
    throw err;
  }
};

const verificaTalk = (talk) => {
  if (!talk || talk === {} || typeof (talk.rate) === 'undefined' || !talk.watchedAt) {
    const err = new Error(
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    );
    err.code = 400;
    throw err;
  }

  verificaRate(talk.rate);
  verificaWatchedAt(talk.watchedAt);
};

const getMaxId = (data) => data.reduce((acc, cur) => (cur.id > acc ? cur.id : acc), 0);

router.get('/', (_req, res) => {
  fs.readFile(FILE)
    .then((result) => res.status(200).json(JSON.parse(result)))
    .catch((err) => res.status(404).json({ message: err.message }));
});

router.get('/:id', (req, res) => {
  fs.readFile(FILE)
    .then((result) => JSON.parse(result))
    .then((result) => result.filter((entry) => entry.id === +req.params.id))
    .then((result) => {
      if (result.length > 0) {
        res.status(200).send(result[0]);
      } else {
        throw new Error('Pessoa palestrante não encontrada');
      }
    })
    .catch((err) => res.status(404).json({ message: err.message }));
});

const checks = (authorization, name, age, talk) => {
  verificaToken(authorization);
  verificaNome(name);
  verificaIdade(age);
  verificaTalk(talk);
};

router.post('/', (req, res) => {
  const { name, age, talk } = req.body;
  fs.readFile(FILE)
    .then((result) => JSON.parse(result))
    .then((data) => {
      const { authorization } = req.headers;
      checks(authorization, name, age, talk);
      const newEntry = { id: getMaxId(data) + 1, name, age, talk };
      fs.writeFile(FILE, JSON.stringify([...data, newEntry]))
        .then(() => console.log('ok'));
      res.status(201).json(newEntry);
    })
    .catch((err) => res.status(err.code).json({ message: err.message }));
});

router.put('/:id', (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { name, age, talk } = req.body;
  fs.readFile(FILE)
    .then((result) => JSON.parse(result))
    .then((data) => {
      const index = data.findIndex((item) => item.id === +id);
      const arr = [...data];
      checks(authorization, name, age, talk);
      if (index === -1) {
        res.status(404).json({ message: 'Not found' });
      } else {
        arr[index] = { id: +id, name, age, talk };
        fs.writeFile(FILE, JSON.stringify(arr));
      }
      res.status(200).json(arr[index]);
    })
    .catch((err) => res.status(err.code).json({ message: err.message }));
});

router.delete('/:id', (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  fs.readFile(FILE)
    .then((result) => JSON.parse(result))
    .then((result) => {
      const arr = [...result];
      const index = result.findIndex((item) => item.id === +id);
      verificaToken(authorization);
      if (index === -1) {
        res.status(404).json({ message: 'Not found!' });
      }
      arr.splice(index, 1);
      fs.writeFile(FILE, JSON.stringify(arr));
      res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
    })
    .catch((err) => res.status(err.code).json({ message: err.message }));
});

module.exports = router;
