const HTTP_BAD_REQUEST_STATUS = 400;

const validateEmail = (request, response, next) => {
  const { email } = request.body;
  if (!email || email === '') {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "email" é obrigatório' });
  }
  // Source: https://regexr.com/64or4
  const emailRegex = /^\S+@\S+.[a-z]$/.test(email);
  if (!emailRegex) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
  }
  next();
};

const validatePassword = (request, response, next) => {
  const { password } = request.body;
  const MAX_PASS_LENGTH = 6;
  if (!password || password === '') {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < MAX_PASS_LENGTH) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const getToken = (request, _response, next) => {
  const TOKEN_ALEATORY_KEY = 10;
  let token = '';
  for (let i = 0; i < TOKEN_ALEATORY_KEY; i += 1) {
    // Source: https://pt.stackoverflow.com/questions/107322/como-gerar-um-token-na-barra-de-link-com-javascript
    // max radix number 36 --> [0-9][A-Z]
    token += (Math.floor(Math.random() * 256)).toString(36);
  }
  const getLengthEqual16 = token.substr(0, 16);
  request.tok = getLengthEqual16;
  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  getToken,
};
