function validateEmail(req, res, next) {
  const { email } = req.body;
  const emailPatternRegex = /\S+@\S+\.\S+/;
  
  if (!email || email === '') return res
    .status(400)
    .json({message: "O campo \"email\" é obrigatório"});
  
  if (!emailPatternRegex.test(email)) return res
    .status(400)
    .json({message: "O \"email\" deve ter o formato \"email@email.com\""});
  
  next();
};

function validatePassword(req, res, next) {
  const { password } = req.body;
  const passwordMinLength = 6;

  if (!password || password === '') return res
    .status(400)
    .json({message: "O campo \"password\" é obrigatório"});
  
  if (password.length < passwordMinLength) return res
    .status(400)
    .json({message: "O \"password\" deve ter pelo menos 6 caracteres"});
  
  next();
};

module.exports = {validateEmail, validatePassword};
