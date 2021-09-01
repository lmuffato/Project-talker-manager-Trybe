/* Source: https://github.com/tryber/sd-09-project-talker-manager/tree/luizfrodrigues-project-talker-manager */
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (req.headers.authorization.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  
  next();
};

module.exports = verifyToken;