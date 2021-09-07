async function authToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' }); 
    }
    if (authorization === '' || authorization.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next();
  } catch (err) {
    return console.log(err.message);
  }
}

module.exports = authToken;
