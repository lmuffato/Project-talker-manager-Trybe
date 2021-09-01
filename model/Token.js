class Token {
  constructor(code) {
    this.code = code;
    this.validation();
  }

  validateCode() {
    return this.code.length === 16;
  }

  validation() {
    if (!this.code) throw new Error('Token não encontrado');
    if (!this.validateCode()) throw new Error('Token inválido');
  }
}

module.exports = Token;
