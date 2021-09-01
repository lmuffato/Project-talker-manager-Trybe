const crypto = require('crypto');
const { Login } = require('../model/Login');
const Token = require('../model/Token');

const generateToken = async () => crypto.randomBytes(8).toString('hex');

const tokenIsValid = (token) => {
  const tokenValidated = new Token(token);
  return !!tokenValidated;
};

const signIn = async (email, password) => {
  const login = new Login(email, password);
  console.log('logado: ', login);
  return generateToken();
};

module.exports = { signIn, tokenIsValid };
