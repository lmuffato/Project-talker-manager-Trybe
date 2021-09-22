const { HTTP_BAD_REQUEST } = require('../utils/statusHttp');

const talkerAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(HTTP_BAD_REQUEST).send({
      message: 'O campo "age" é obrigatório',
    });
  } if (age < 18) {
    return res.status(HTTP_BAD_REQUEST).send({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
};

module.exports = {
  talkerAge,
};