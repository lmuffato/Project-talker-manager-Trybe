// Packages
const { Router } = require('express'); // Pacote router do express
const bodyParser = require('body-parser'); // Converter o body da requisição em .json()
const crypto = require('crypto'); // Pacote node de criptografia, usado para gerar tokens de sessão 

// Middlewares de validação
const { emailValidation } = require('../middlewares/validations/emailValidation');
const { passwordValidation } = require('../middlewares/validations/passwordValidation');

const router = Router();

// IMPORTANTE! Deve-se susbstituir app por router, onde era "app" no arquivo principal
router.use(bodyParser.json());

// POST - Rota para validar um login e gerar um token;
// Rota: /login
router.post('/', emailValidation, passwordValidation, async (request, response) => {
  const token = await crypto.randomBytes(8).toString('hex'); // gera um token de 6 caracteres
  return response.status(200).json({ token: `${token}` });
});
/* REQUISIÇÃO
echo '{"email":"email@email.com", "password":"123456789" }' | http POST :3000/login  // (ok) retorna o token 
http POST :3000/login email='email@email.com' password='123456789'                   // (ok) retorna o token 
http POST :3000/login email='' password='123456789'                                  // (error)
http POST :3000/login email='email@email.com' password=''                            // (error)
http POST :3000/login email='' password=''                                           // (error)
*/

module.exports = router;

/* IMPORTANTE!
No router a rota '/' representa a rota '/login' definida no arquivo principal.
Por isso, as rotas declaradas depois do '/' no router, como '/user', na verdade,
serão '/login/user'.
*/