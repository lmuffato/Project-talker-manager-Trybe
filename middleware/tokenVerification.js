// const fs = require('fs').promises;

const tokenVerification = async (req, res, next) => {
  const tokenCheck = req.headers.authorization;

  // const token = await fs.readFile('token.txt', 'utf8')
  //   .then((result) => console.log(result))
  //   .then((result) => result);
  // const token = '0fd663466aaa5297';

  if (!tokenCheck) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (tokenCheck.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = tokenVerification;