const fs = require('fs');

const talkers = './talker.json';

const readFilePromise = () => new Promise((resolve, reject) => {
    fs.readFile(talkers, 'utf8', (err, content) => {
      if (err) return reject(err);
      return resolve(content);
    });
  });

const middlewareAllTalkers = (_req, res) => readFilePromise()
  .then((result = []) => res.status(200).json(JSON.parse(result)))
  .catch((erro) => res.status(500).json({ message: `Erro interno: ${erro}` }));

module.exports = middlewareAllTalkers;
