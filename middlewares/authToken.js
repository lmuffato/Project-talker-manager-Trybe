async function authToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' }); 
    }
    
    const { token } = JSON.parse(authorization);
    
    if (token.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next();
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = authToken;
