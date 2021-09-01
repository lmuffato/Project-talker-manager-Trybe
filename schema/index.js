// Para não ficar escrevendo toda hora o status e mensagens de resposta, irei deixar as mensagens prontas aqui e ir chamando dentro da camada controllers ou no middleware

const status = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
};

const message = {
  ageNotFound: 'O campo "age" é obrigatório',
  deleteUser: 'Pessoa palestrante deletada com sucesso',
  emailNotFound: 'O campo "email" é obrigatório',
  invalidData: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  incorrectEmail: 'O "email" deve ter o formato "email@email.com"',
  invalidName: 'O campo "name" é obrigatório',
  invalidRate: 'O campo "rate" deve ser um inteiro de 1 à 5"',
  invalidTalk: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  invalidToken: 'Token inválido',
  notFound: 'Pessoa palestrante não encontrada',
  passwordNotFound: 'O campo "password" é obrigatório',
  shortName: 'O "name" deve ter pelo menos 3 caracteres',
  shortPassword: 'O "password" deve ter pelo menos 6 caracteres',
  tokenNotFound: 'Token não encontrado',
  underAge: 'A pessoa palestrante deve ser maior de idade',

};

module.exports = { status, message };
