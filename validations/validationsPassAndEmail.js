function validateEmail(req, res, next) {
  const { email } = req.body;
  const regex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
  
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo email deve ser obrigatorio' });
  } if (!email.match(regex)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}
function validatePassword(req, res, next) {
  const password = req.body;
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (password.lenght < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

module.exports = {
  validateEmail,
  validatePassword,
};
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match
// https://stackoverflow.com/questions/940577/javascript-regular-expression-email-validation