// Caso o campo não seja passado ou esteja vazio retorne um código de status 400,
// com o seguinte corpo:
//   "message": "O campo \"password\" é obrigatório"
// Caso a senha não tenha pelo menos 6 caracteres retorne um código de status 400,
// com o seguinte corpo:
//   "message": "O \"password\" deve ter pelo menos 6 caracteres"

function passwordlValidation(req, res, next) {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

module.exports = passwordlValidation;