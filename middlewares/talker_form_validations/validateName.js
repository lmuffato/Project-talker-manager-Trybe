const NAME_FIELD_IS_REQUIRED = { message: 'O campo "name" é obrigatório' };
const INVALID_NAME = { message: 'O "name" deve ter pelo menos 3 caracteres' };

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json(NAME_FIELD_IS_REQUIRED);

  if (name.length < 3) return res.status(400).json(INVALID_NAME);

  next();
};

module.exports = { validateName };