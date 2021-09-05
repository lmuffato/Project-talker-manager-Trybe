const M = require('./Messages/Messages.js');

const validationAndRegexToken = (req, res, next) => {
  const auth = req.headers.authorization;
  const REGEX_VALIDATION_TOKEN = /^[0-9a-zA-Z]{16}$/;

  if (!auth) res.status(401).send({ message: M.MESSAGE_TOKEN_NOT_FOUND });

  if (!REGEX_VALIDATION_TOKEN.test(auth)) res.status(401).send({ message: M.INVALID_TOKEN });

  next();
};

const loginValidation = (req, res, next) => {
  const { body } = req;
  const { email, password } = body;
  const REGEX_EMAIL = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;

  if (!email) return res.status(400).send({ message: M.REQUIRED_FIELD_EMAIL });

  if (!REGEX_EMAIL.test(email)) return res.status(400).send({ message: M.FORMATATION_EMAIL });

  if (!password) return res.status(400).send({ message: M.REQUIRED_FIELD_PASSOWRD });

  if (password.length <= 6) return res.status(400).send({ message: M.REQUIRED_PASSWORD_LENGTH });

  next();
};

const nameAndAgeValidation = (req, res, next) => {
  const { name, age } = req.body;

  if (!name) return res.status(400).send({ message: M.REQUIRED_FIELD_NAME });

  if (name.length < 3) return res.status(400).send({ message: M.REQUIRED_NAME_LENGTH });

  if (!age) return res.status(400).send({ message: M.REQUIRED_FIELD_AGE });

  if (age < 18) return res.status(400).send({ message: M.CONDITION_AGE });

  next();
};

const validateRateAndWatchedatPayload = (req, res, next) => {
  const { rate, watchedAt } = req.body.talk;
  const isRateValid = Number.isInteger(rate) && rate >= 1 && rate <= 5;

  if (!isRateValid) return res.status(400).send({ message: M.CONDITION_RATE });

  const REGEX_DATA = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!REGEX_DATA.test(watchedAt)) return res.status(400).send({ message: M.FORMATATION_DATE });

  next();
};

const validateTalkPayload = (req, res, next) => {
  const { talk } = req.body;
  console.log('xablau', req.body);

  if (!talk) {
    return res.status(400).send({
      message: M.RF_TWR,
    });
  }
  if (talk.rate === undefined || talk.watchedAt === undefined) {
    return res.status(400).send({
      message: M.RF_TWR,
    });
  }
  next();
};

  module.exports = {
      validationAndRegexToken,
      loginValidation,
      nameAndAgeValidation,
      validateRateAndWatchedatPayload,
      validateTalkPayload,
  }; 