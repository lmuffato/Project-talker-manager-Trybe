const fs = require('fs');

const validaNome = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validaIdade = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validaTalker = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  } 
  next();
};

const validaCamposTalker = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;
  const validaDataRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (!validaDataRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (Number(rate) > 5 || Number(rate) < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const readFilePromise = () => new Promise((resolve, reject) => {
  fs.readFile('./talker.json', 'utf8', (err, content) => {
    if (err) return reject(err);
    return resolve(content);
  });
});

const deleteTalker = (req, res) => {
  const { id } = req.params;
  readFilePromise()
  .then((response) => {
    const allTalkers = JSON.parse(response);
    const newAllTalkers = allTalkers.filter((talker) => talker.id !== Number(id));
    fs.writeFile('./talker.json', JSON.stringify(newAllTalkers), () => {});
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  })
  .catch((erro) => res.status(500).json({ message: `Erro interno: ${erro}` }));
};

const editTalker = (req, res) => {
  const { name, age, talk } = req.body;
  const talkerEdit = { name, age, id: -1, talk };
  readFilePromise()
  .then((response) => {
    const allTalkers = JSON.parse(response);
    allTalkers.forEach((talker, index) => {
      if (talker.id === Number(req.params.id)) {
        talkerEdit.id = Number(req.params.id);
        allTalkers.splice(index, 1, talkerEdit);
      }
    });
    if (talkerEdit.id === -1) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    fs.writeFile('./talker.json', JSON.stringify(allTalkers), () => {});
    return res.status(200).json(talkerEdit);
  })
  .catch((erro) => res.status(500).json({ message: `Erro interno: ${erro}` }));
};

const addTalker = (req, res) => {
  const { name, age, talk } = req.body;
  readFilePromise()
  .then((response) => {
    const allTalkers = JSON.parse(response);
    const talker = { name, age, id: allTalkers.length + 1, talk };
    fs.writeFile('./talker.json', JSON.stringify([...allTalkers, talker]), () => {});
    return res.status(201).json(talker);
  })
  .catch((erro) => res.status(500).json({ message: `Erro interno: ${erro}` }));
};

module.exports = {
  validaNome,
  validaIdade,
  validaTalker,
  validaCamposTalker,
  addTalker,
  editTalker,
  deleteTalker,
}; 
