module.exports = {
  validateEmail(req, res, next) {
    const { email } = req.body;
    // regexr.com/2ri2c
    const emailPattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
    
    try {
      if (!email) throw new Error('O campo "email" é obrigatório');
      const validEmail = email.match(emailPattern);
      if (!validEmail) throw new Error('O "email" deve ter o formato "email@email.com"');
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

    next();
  },

  validatePassword(req, res, next) {
    const { password } = req.body;
    
    try {
      if (!password) throw new Error('O campo "password" é obrigatório');
      const validPasswordLength = password.length >= 6;
      if (!validPasswordLength) throw new Error('O "password" deve ter pelo menos 6 caracteres');
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

    next();
  },
};
