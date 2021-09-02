module.exports = {
  tokenAuthentication(req, res, next) {
    const { authorization } = req.headers;

    try {
      if (!authorization) throw new Error('Token não encontrado');
      const validToken = typeof authorization === 'string' && authorization.length === 16;
      if (!validToken) throw new Error('Token inválido');
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }

    next();
  },
};
