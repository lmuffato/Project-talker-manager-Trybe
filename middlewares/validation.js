const checkLength = require('../utils/checkLength');

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
      checkLength({ password }, 6);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

    next();
  },

  validateName(req, res, next) {
    const { name } = req.body;
    try {
      checkLength({ name }, 3);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

    next();
  },

  validateAge(req, res, next) {
    const { age } = req.body;
    try {
      if (!age) throw new Error('O campo "age" é obrigatório');
      if (age < 18) throw new Error('A pessoa palestrante deve ser maior de idade');
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

    next();
  },
};
