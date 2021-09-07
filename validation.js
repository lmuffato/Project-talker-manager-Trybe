const validEmail = (req, res, next) => {
    const { email } = req.body; 
    const re = /\S+@\S+\.\S+/;
    const regex = re.test(email);
    if (!email || email === '') {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (regex === false) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
      next();
  };

  const validPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password || password === '') {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
      next();
  };
  const validateName = (req, res, next) => {
    const { name } = req.body;
    if (!name || name === '') {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
  
    next(); 
  };
module.exports = { validEmail, validPassword, validateName };