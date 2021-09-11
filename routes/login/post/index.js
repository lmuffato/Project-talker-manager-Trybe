const router = require('express').Router();
const { isEmailValid, isPasswordValid } = require('../../../utils/validations');
const { HTTP_OK_STATUS } = require('../../../utils/serverStatus');

router.use(isEmailValid, isPasswordValid);

router.post('/', (_req, res, next) => {
  res.status(HTTP_OK_STATUS).json({
    token: '7mqaVRXJSp886CGr',
  });

  next();
});

module.exports = router;
