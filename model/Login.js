class Login {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.validation();
  }

  validateEmail() {
    const emailValidator = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailValidator.test(this.email);
  }

  validatePassword() {
    return this.password.length >= 6;
  }

  validation() {
    if (!this.email) throw new Error('O campo "email" é obrigatório');
    if (!this.validateEmail()) throw new Error('O "email" deve ter o formato "email@email.com"');
    if (!this.password) throw new Error('O campo "password" é obrigatório');
    if (!this.validatePassword()) throw new Error('O "password" deve ter pelo menos 6 caracteres');
  }
}

module.exports = { Login };
