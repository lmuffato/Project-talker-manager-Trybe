const HTTP_BAD_REQUEST_STATUS = 400;

const ageValidation = (req, res, next) => {
  const { age } = req.body;
  
  if (!age || age === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'A pessoa palestrante deve ser maior de idade' },
    );
  }

  next();
};

module.exports = ageValidation;
