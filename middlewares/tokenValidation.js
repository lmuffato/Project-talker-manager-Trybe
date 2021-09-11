// Verifica se o campo 'token' foi enviado vazio
const emptyToken = (authorization) => {
  if (!authorization || authorization === '' || authorization === null) { return true; }
  return false;
};

// Verifica se o token enviado tem mais de 16 caracteres e está em um formato válido
const validToken = (authorization) => {
  if (authorization.length >= 16 && typeof authorization === 'string') { return true; }
  return false;
};

// Middleware para validação de token
const tokenValidation = (request, response, next) => {
  const { authorization } = request.headers;
  try {
    if (emptyToken(authorization)) {
      throw new Error('Token não encontrado');
    }
    if (!validToken(authorization)) {
      throw new Error('Token inválido');
    }
  } catch (error) {
    return response.status(401).json({ message: error.message });
  }
  next();
};

module.exports = { tokenValidation };
