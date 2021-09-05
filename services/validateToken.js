const validateToken = (auth) => {
  const regex = /^[\w]{16}$/i;

  if (!regex.test(auth)) {
    return { status: 401, message: 'Token inválido' };
  }

  if (!auth) {
    return { status: 401, message: 'Token não encontrado' };
  }

  return { ok: true };
};

module.exports = validateToken;
