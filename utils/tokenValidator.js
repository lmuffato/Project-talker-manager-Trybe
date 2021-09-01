function tokenValidator(tk) {
  if (!tk) {
    return { message: 'Token não encontrado' };
  }
  if (tk.length !== 16 || tk === '                ') {
    return { message: 'Token inválido' };
  }
  return 0;
}

module.exports = tokenValidator;
