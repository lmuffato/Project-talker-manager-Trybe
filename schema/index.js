// Para não ficar escrevendo toda hora o status e mensagens de resposta, irei deixar as mensagens prontas e ir chamando dentro da camada controllers ou no middleware

const status = {
  ok: 200,
  notFound: 404,
};

const message = {
  notFound: 'Pessoa palestrante não encontrada',
  emailNotFound: 'O campo email é obrigatório',
  incorrectEmail: 'O email deve ter o formato "email@email.com"',
  passwordNotFound: 'O campo "password" é obrigatório',
  shortPassword: 'O "password" deve ter pelo menos 6 caracteres',
};

module.exports = { status, message };
