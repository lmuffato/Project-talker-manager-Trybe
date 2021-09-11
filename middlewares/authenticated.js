const loginEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;

  if (email === '' || !email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(String(email).toLowerCase())) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const loginPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const tokenauthenticated = (req, res) =>
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });

module.exports = { loginEmail, loginPassword, tokenauthenticated };

// regex = /\S+@\S+\.\S+/; if (!regex.test(String(email).toLowerCase()));
