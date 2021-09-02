/* codigo pego da sugestão do dia 26.4
https://app.betrybe.com/course/back-end
/introducao-ao-desenvolvimento-web-com-nodejs
/express-http-com-nodejs
/8022a9b1-7548-4298-97ce-9acfa8986e66/exercicios
/9c2c5a4e-f43a-4afd-a803-72d841ca26b4/bonus
/b1096a63-5900-47e7-9757-e1c6fc961e2f?use_case=side_bar */

const { randomBytes } = require('crypto');

const tokenGeneretor = () => randomBytes(8).toString('hex');

module.exports = tokenGeneretor;