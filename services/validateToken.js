const validateToken = (token) => {
  const regex = /^[\w]{16}$/i;
  const Token = regex.test(token);

  if (!token || !token.length) {
    return { status: 401, message: 'Token não encontrado' };
  }
  if (!Token) {
    return { status: 401, message: 'Token inválido' };
  }
  return { ok: true };
};

module.exports = validateToken;
