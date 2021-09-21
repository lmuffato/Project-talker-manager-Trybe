const express = require('express');
const bodyParser = require('body-parser');

// Router
const router = express.Router();
router.use(bodyParser.json());

// Middlewares
const {
  getLoginToken,
} = require('../middlewares');
const {
  emailValidation,
  passwordValidation,
} = require('../validations');

// Routes
const postMiddlewares = [
  emailValidation,
  passwordValidation,
  getLoginToken,
];

router.post('/', postMiddlewares);

module.exports = router;
