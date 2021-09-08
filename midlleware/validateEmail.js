// Função que valida email conforme regras usando regex
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return false;

  return true;
};

module.exports = validateEmail;