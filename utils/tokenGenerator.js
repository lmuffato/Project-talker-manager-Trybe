// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

function createToken(length) {
  let token = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
 return token;
}

module.exports = { createToken };