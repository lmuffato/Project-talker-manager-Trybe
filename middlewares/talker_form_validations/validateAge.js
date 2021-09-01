const AGE_FIELD_IS_REQUIRED = { message: 'O campo "age" é obrigatório' };
const INVALID_AGE = { message: 'A pessoa palestrante deve ser maior de idade' };

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(400).json(AGE_FIELD_IS_REQUIRED);
  
  if (!Number.isInteger(Number(age)) || Number(age) < 18) return res.status(400).json(INVALID_AGE);

  next();
};

module.exports = { validateAge };