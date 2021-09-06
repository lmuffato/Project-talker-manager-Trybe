const validarEmail = (req, res, next) => {
  // A linha abaixo diz que o e-mail vem pelo Body da requisição
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  // Padrão para o RegEx: https://regexr.com/2ri2c
  // Mesmo padrão utilizado no projeto App de Receitas
  const pattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;

  // Mesmo padrão de comparação utilizado no projeto App de Receitas
    const compararPattern = email.match(pattern);
  if (!compararPattern) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validarPassword = (req, res, next) => {
  // A linha abaixo diz que a senha vem pelo Body da requisição
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  // Mesmo padrão de verificação utilizado no projeto App de Receitas
  const digits = 6;
  if (password.length < digits) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const tokenLogin = (_req, res, _next) => {
  // Date.now gera 13 caracteres. Acrescentei 3 letras
  // para completar os 16 caracteres exigidos.
  // Esse formato funcionará bem por pelo menos 200 anos!
  const novoToken = `t${Date.now()}kn`;
  return res.status(200).json({ token: novoToken });
};

module.exports = {
  tokenLogin,
  validarEmail,
  validarPassword,
};
