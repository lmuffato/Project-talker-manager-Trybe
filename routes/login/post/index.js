const router = require('express').Router();
const { isEmailValid, isPasswordValid } = require('../../../utils/validations');
const { HTTP_OK_STATUS } = require('../../../utils/serverStatus');

router.use(isEmailValid, isPasswordValid);

router.post('/', (_req, res) => {
  const token = '7mqaVRXJSp886CGr';

  res.set('token', token);
  
  res.status(HTTP_OK_STATUS).json({
    token,
  });
});

module.exports = router;
