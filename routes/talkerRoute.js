const fs = require('fs');

const filePath = ('talker.json');

const saveTalkers = (talkers) => fs.writeFileSync(filePath, JSON.stringify(talkers, null, '\t'));

const noToken = {
    "message": "Token não encontrado"
  };

const invalidToken = {
    "message": "Token inválido"
  };

const getTalkers = () => {
    const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : [];

    try {
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const getTalker = (req, res) => {
    const datas = fs.readFileSync(filePath);
    const answer = JSON.parse(datas);
    const defAnswer = answer.find(({ id }) => id === parseInt(req.params.id, 10));
    const message = {
        message: 'Pessoa palestrante não encontrada',
      };
      if (!defAnswer) return res.status(404).send(message);
      if (defAnswer) return res.status(200).send(defAnswer);
};

// const logIn = (_req, res) => {

// };

// const setTalkers = (_req, res) => {

// };

const deleteTalker = (req, res) => {
    const talker = getTalker();
    const message = { "message": "Pessoa palestrante deletada com sucesso" };
    if (talker) return res.status(200).send(message);
    if (!talker) return res.status(401).send(noToken);
};

const token = '7mqaVRXJSp886CGr';

const talkerRoute = (app) => {
    app.route('/talker')
    .get((_req, res) => {
        const talkers = getTalkers();
        res.status(200).send(talkers);
    })
    .post((_req, res) => {
        const talkers = setTalkers();
        res.status(200).send(talkers);
    });
    app.route('/talker/:id')
    .get((req, res) => {
      getTalker(req, res);
    })
    .delete((req, res) => {
      deleteTalker(req, res);
    })
    app.route('/login')
    .post((_req, res) => {
        logIn(_req, res);
    });
};

module.exports = talkerRoute;