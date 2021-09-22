const { HTTP_BAD_REQUEST } = require('../utils/statusHttp');

const nameTalker = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(HTTP_BAD_REQUEST).send({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST).send({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  
  next();
};

module.exports = {
  nameTalker,
};