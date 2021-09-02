const fs = require('fs');

const talkers = './talker.json';

const readFilePromise = () => new Promise((resolve, reject) => {
    fs.readFile(talkers, 'utf8', (err, content) => {
      if (err) return reject(err);
      return resolve(content);
    });
  });

const middlewareTalkerId = (req, res) => {
  const { id } = req.params;
  readFilePromise()
  .then((response = []) => {
    const Alltalkers = JSON.parse(response);
    return Alltalkers.find((talker) => talker.id === Number(id));
  })
  .then((result) => {
    console.log(result);
    if (!result) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(result);
  })
  .catch((erro) => res.status(500).json({ message: `Erro interno: ${erro}` }));
};

module.exports = middlewareTalkerId;
