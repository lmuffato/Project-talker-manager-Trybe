// gerador de token https://qastack.com.br/programming/1349404/generate-random-string-characters-in-javascript

const tokenGenerator = (tokenNumber) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const characterLength = characters.length;
  for (let i = 0; i < tokenNumber; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characterLength));
  }
  return result;
};

module.exports = {
  tokenGenerator,
};