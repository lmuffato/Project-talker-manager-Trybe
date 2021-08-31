const validateToken = (req, res) => {
  const { token } = req.headers;
  const regexAlphanumeric = /^[a-zA-Z0-9-_!@#$%^&*]{16,16}$/;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  console.log(token);
  console.log(regexAlphanumeric.test(token));

  if (!regexAlphanumeric.test(token)) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  return res.status(200).send('Ola mundo!');
};

module.exports = validateToken;