const router = require('express').Router();
const { HTTP_OK_STATUS } = require('../../../utils/serverStatus');
const { 
  isTokenValid,
  isNameValid,
  isAgeValid,
} = require('../../../utils/validations');

router.use(isTokenValid, isNameValid, isAgeValid);

router.post('/', (_req, res) => {
  res.status(HTTP_OK_STATUS).json({
    message: 'success',
  });
});

module.exports = router;
