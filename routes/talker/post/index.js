const router = require('express').Router();
const { isTokenValid } = require('../../../utils/validations');
const { HTTP_OK_STATUS } = require('../../../utils/serverStatus');

router.use(isTokenValid);

router.post('/', (_req, res) => {
  res.status(HTTP_OK_STATUS).json({
    message: 'success',
  });
});

module.exports = router;
