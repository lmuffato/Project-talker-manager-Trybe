module.exports = {
  tokenAuthentication(req, res, next) {
    const { token } = req.headers;

    try {
      if (!token) throw new Error('Token não encontrado');
      const validToken = typeof token === 'string' && token.length === 16;
      if (!validToken) throw new Error('Token inválido');
    } catch (error) {
      res.status(401).json({ message: error.message });
    }

    next();
  },
};
