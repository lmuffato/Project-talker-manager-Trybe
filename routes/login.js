const router = require('express').Router();
const { emailValidation, passwordValidation } = require('../middlewares/emailValidation');

const HTTP_OK_STATUS = 200;

router.post('/', emailValidation, passwordValidation, (_req, res) => 
res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' }).end());

module.exports = router;