const { HTTP_OK_STATUS, HTTP_BAD_REQUEST_STATUS } = require('../utils/httpStatus');
const generateToken = require('../utils/generateToken');

const verifyEmail = async (req, res, next) => {
  const { email } = req.body;
  
  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
  const validEmail = emailRegex.test(email);

  if (!email || email.trim() === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo \\"email\\" é obrigatório',
    });
  }

  if (!validEmail) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O email deve ter o formato \\"email@email.com\\"',
    });
  }

  next();
};

const verifyPassword = async (req, res, next) => {
  const { password } = req.body;

  if (!password || password.trim() === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo \\"password\\" é obrigatório' },
    );
  }

  if (password <= 5) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O \\"password\\" deve ter pelo menos 6 caracteres' },
    );
  }
  next();
};

const login = (_req, res) => {
  const isValidEmail = verifyEmail();
  const isValidPassword = verifyPassword();
  if (isValidEmail && isValidPassword) {
    return res.status(HTTP_OK_STATUS).json({ token: generateToken() });
  }
};

module.exports = login;
