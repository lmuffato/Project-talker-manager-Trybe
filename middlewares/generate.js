const crypto = require('crypto');

module.exports = {
  generateToken(req, res) {
    // https://github.com/tryber/sd-010-a-project-talker-manager/blob/7fe006d5f1cca4997964694af17ef83bc50a3def/middlewares/login.js#L29
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  },
};
