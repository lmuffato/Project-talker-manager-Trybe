const validToken = (req, res, next) => {
  console.log('entrei no validToken');
  const { authorization } = req.headers;
  console.log('authorization');
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.lenght < 16 || authorization.lenght > 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  console.log('cheguei no next');
  next();
};
/* 
const validName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.lenght < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age.length === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (parseInt(age, 10) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validTalk = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk; 
  if (!talk || !watchedAt || !rate) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validTalkKeys = (req, res, next) => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const { talk: watchedAt, rate } = req.body;
  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}; */

const allTalkerValidations = [
  validToken,
  /*  validName,
  validAge,
  validTalk,
  validTalkKeys, */
];

  module.exports = { allTalkerValidations };

/* Referência de regex de IagoFerreira:
https://github.com/tryber/sd-010-a-project-talker-manager/pull/4/files ;
*/
