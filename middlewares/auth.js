const fs = require('fs').promises;

const UNAUTHORIZED_STATUS = 401;

const authMiddleware = async (_request, response, next) => {
  const token = _request.headers.authorization;
  if (!token) return response.status(UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
  const data = await fs.readFile('user.json');
  const jsonData = JSON.parse(data);
  if (jsonData.token !== token) {
    return response.status(UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = authMiddleware;