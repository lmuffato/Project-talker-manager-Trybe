// método para gerar uma chave aleatória encontrado no link do course:
// https://app.betrybe.com/course/back-end/introducao-ao-desenvolvimento-web-com-nodejs/express-http-com-nodejs/8022a9b1-7548-4298-97ce-9acfa8986e66/exercicios/5d42149d-58a0-4524-9524-fd77c7c4bdde/bonus/b40c2f84-3ff7-41ed-ba37-c86a48c872b1?use_case=side_bar
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = generateToken;