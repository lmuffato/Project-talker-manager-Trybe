const BAD_REQUEST = 400;

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (name === undefined || name === '') {
    return res.status(BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
    return res.status(BAD_REQUEST).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

module.exports = validateName;