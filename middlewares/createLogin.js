const validatePassword = require('./validatePassword');
const validateEmail = require('./validateEmail');
const getToken = require('./getToken');

async function createLogin(req, res) {
  try {
    const validEmail = await validatePassword(req, res);
    const validPassword = await validateEmail(req, res);
    if (!validEmail && !validPassword) return res.status(200).json(getToken());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = createLogin;
