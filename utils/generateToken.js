// Referencia: https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details

const generateRandomString = () => Math.random().toString(36).substr(2);

const generateToken = () => {
  const tokenLength = 16;
  let token = '';
  
  do {
    token += generateRandomString();
  } while (token.length < tokenLength);

  return token.substr(0, tokenLength);
};

module.exports = generateToken;
