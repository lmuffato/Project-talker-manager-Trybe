const validateToken = (auth) => {
  const regex = /^[\w]{16}$/i;

  if (!auth) {
    return { status: 401, message: 'Token não encontrado' };
  }

  if (!regex.test(auth)) {
    return { status: 401, message: 'Token inválido' };
  }

  return { ok: true };
};

module.exports = validateToken;
