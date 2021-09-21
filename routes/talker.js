const express = require('express');
const bodyParser = require('body-parser');

// Router
const router = express.Router();
router.use(bodyParser.json());

// Middlewares
const {
  getTalkersMiddleware,
  getTalkerByIdMiddleware,
} = require('../middlewares');

// Routes
router.get('/', getTalkersMiddleware);
router.get('/:talkerId', getTalkerByIdMiddleware);

module.exports = router;
