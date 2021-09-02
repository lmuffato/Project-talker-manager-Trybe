// Caso o campo não seja passado ou esteja vazio retorne um código de status 400,
// com o seguinte corpo:
//   "message": "O campo \"email\" é obrigatório"
// Caso o email passado não seja um email válido retorne um código de status 400,
// com o seguinte corpo:
//   "message": "O \"email\" deve ter o formato \"email@email.com

function emailValidation(req, res, next) {
  const regex = /\S+@\S+\.\S+/;
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}
  module.exports = emailValidation;
