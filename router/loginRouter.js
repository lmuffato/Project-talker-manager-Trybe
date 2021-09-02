const { Router } = require('express');
const {
  validateEmail,
  validatePassword,
  generateToken,

} = require('../validations/loginValidations');

const router = Router();

const HTTP_OK_STATUS = 200;

router.post('/', 
validateEmail,
validatePassword,
generateToken, (req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: req.token });
});

module.exports = router;