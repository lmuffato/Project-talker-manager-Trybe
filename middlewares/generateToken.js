const randtoken = require('rand-token');

const generateToken = (_req, res) => {
  const myToken = randtoken.generate(16);
  return res.status(200).json({ token: myToken });
};

module.exports = generateToken;