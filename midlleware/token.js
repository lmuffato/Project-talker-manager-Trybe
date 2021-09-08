// Função que gera numeros aleaórios para o token
// Uso do crypto foi indicação do site https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/
const crypto = require('crypto');

const token = () => {
    const newToken = crypto.randomBytes(8).toString('hex');
    
    return newToken;
  };

module.exports = token;