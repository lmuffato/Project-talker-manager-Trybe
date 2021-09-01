/* Source: https://github.com/tryber/sd-09-project-talker-manager/tree/luizfrodrigues-project-talker-manager */
const verifyAge = (req, res, next) => {
  if (!req.body.age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (req.body.age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

module.exports = verifyAge;