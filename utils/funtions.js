const codigo = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

const randToken = (length) => {
  const token = [];  
  for (let index = 0; index < length; index += 1) {
      const randomIndex = (Math.random() * (codigo.length - 1)).toFixed(0);
      token[index] = codigo[randomIndex];
  }
  return token.join('');
};

// Essa função que tem um regex para chekar o token, foi tirada do repositorio do Renzo , colega da mesma turma.
const checkToken = (token) => {
  const regex = /^(\d|\w){16}$/gm;

  return regex.test(token);
};

module.exports = {
  randToken,
  checkToken,
};