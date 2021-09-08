// Função que valida senha conforme regras usando regex
const validatePassword = (password) => {
    const testPassword = /^(\w{6,})/i;

    if (!testPassword.test(password)) return false;
  
    return true;
};

module.exports = validatePassword;
