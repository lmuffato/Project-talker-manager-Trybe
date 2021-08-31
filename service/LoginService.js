const crypto = require('crypto');
const { Login } = require('../model/Login');

const generateToken = async () => crypto.randomBytes(8).toString('hex');

const signIn = async (email, password) => {
  const login = new Login(email, password);
  console.log('logado: ', login);
  return generateToken();
};

module.exports = { signIn };
