const fs = require('fs');

const filePath = ('talker.json');
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

const talkerRoute = (app) => {
    app.route('/talker')
    .get((_req, res) => {
        const talkers = getTalkers();
        res.status(200).send(talkers);
    });
    app.route('/talker/:id')
    .get((req, res) => {
      getTalker(req, res);
    });
};

module.exports = talkerRoute;