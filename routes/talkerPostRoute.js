const fs = require('fs');

const filePath = ('talker.json');

// const saveTalkers = (talkers) => fs.writeFileSync(filePath, JSON.stringify(talkers, null, '\t'));

const noToken = {
    message: 'Token não encontrado',
  };

const invalidToken = {
    message: 'Token inválido',
  };

// const getTalkers = () => {
//     const data = fs.existsSync(filePath)
//     ? fs.readFileSync(filePath)
//     : [];

//     try {
//         return JSON.parse(data);
//     } catch (error) {
//         return [];
//     }
// };

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

const noneEmail = {
    message: 'O campo "email" é obrigatório',
};
const noneEmailValidation = (res, email) => {
    if (email === undefined) return res.status(400).send(noneEmail);
};

const nonePassword = {
    message: 'O campo "password" é obrigatório',
};
const nonePasswordValidation = (res, password) => {
    if (password === undefined) return res.status(400).send(nonePassword);
};

const invalidEmail = {
    message: 'O "email" deve ter o formato "email@email.com"',
};

const invalidPassword = {
    message: 'O "password" deve ter pelo menos 6 caracteres',
  };

const EmailValidation = (res, email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const validEmail = regex.test(String(email).toLowerCase());
    if (!validEmail) return res.status(400).send(invalidEmail);
};

const passwordValidation = (res, password) => {
    const minPassLength = 6;
    const validPassword = (password.length > minPassLength);
    if (!validPassword) return res.status(400).send(invalidPassword);
};

// const validToken = (res, authorization) => {
//     if (authorization.length !== 16) return res.status(400)
// };

// função vista no projeto do Kevin Fraga - Turma 9
// https://github.com/tryber/sd-09-project-talker-manager/pull/99
// const randomHexGenerator = (res, length) => {
//     const MaxLength = 8;
//     const min = 16 ** (Math.min(16, MaxLength) - 1);
//     const max = 16 ** (Math.min(16, MaxLength)) - 1;
//     const number = Math.floor(Math.random() * (max - min + 1)) + min;
//     let token = number.toString(16);
    
//     while (token.length < length) {
//       token += randomHexGenerator(length - MaxLength);
//     }
//     return res.status(200).json({ token });
//   };

const logIn = async (req, res) => {
    // const { authorization } = req.headers;
    const { email, password } = req.body;
    // randomHexGenerator(res, 16);
    // validToken(res, authorization);
    noneEmailValidation(res, email);
    EmailValidation(res, email);
    nonePasswordValidation(res, password);
    passwordValidation(res, password);
};

// const setTalkers = (_req, res) => {

// };

const deleteTalker = (req, res) => {
    const talker = getTalker();
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send(noToken);
    if (authorization.length !== 16) return res.status(401).send(invalidToken);
    const message = { message: 'Pessoa palestrante deletada com sucesso' };
    if (talker) return res.status(200).send(message);
};

const noName = {
    message: 'O campo "name" é obrigatório',
};

const shortName = {
    message: 'O "name" deve ter pelo menos 3 caracteres',
  };

const validAge = {
    message: 'O campo "age" é obrigatório',
  };

const minorAge = {
    message: 'A pessoa palestrante deve ser maior de idade',
  };

const checkAge = (age, res) => {
  if (!age) return res.status(400).send(validAge);
  if (age < 18) return res.status(400).send(minorAge);
};

const addTalker = (req, res) => {
    const { authorization } = req.headers;
    const { name, age } = req.body;
    if (!authorization) return res.status(401).send(noToken);
    if (authorization.length !== 16) return res.status(401).send(invalidToken);
    if (!name) return res.status(400).send(noName);
    if (name.length < 3) return res.status(400).send(shortName);
    checkAge(age, res);
};

const talkerPostRoute = (app) => {
    app.route('/talker')
    .post((req, res) => {
        addTalker(req, res);
        // const talkers = setTalkers();
        // res.status(200).send(talkers);
    });
    app.route('/talker/:id')
    .delete((req, res) => {
      deleteTalker(req, res);
    });
    app.route('/login')
    .post((req, res) => {
        logIn(req, res);
    });
};

module.exports = talkerPostRoute;