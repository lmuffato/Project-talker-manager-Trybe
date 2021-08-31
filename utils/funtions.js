const codigo = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

const randToken = (length) => {
  const token = [];  
  for (let index = 0; index < length; index += 1) {
      const randomIndex = (Math.random() * (codigo.length - 1)).toFixed(0);
      token[index] = codigo[randomIndex];
  }
  return token.join('');
};

module.exports = {
  randToken,
};