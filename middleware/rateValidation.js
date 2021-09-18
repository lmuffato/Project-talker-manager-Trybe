const HTTP_BAD_REQUEST_STATUS = 400;

const rateValidation = (req, res, next) => {
  const { talk } = req.body;

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
    );
  }

  next();
};

module.exports = rateValidation;
