module.exports = function checkLength(field, minLength) {
  const [key, value] = Object.entries(field)[0];
  if (!value) throw new Error(`O campo "${key}" é obrigatório`);
  const validLength = value.length >= minLength;
  if (!validLength) throw new Error(`O "${key}" deve ter pelo menos ${minLength} caracteres`);

  return true;
};
