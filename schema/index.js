// Afim de não ficar escrevendo toda hora o status e mensagens de resposta, aqui irei deixar as mensagens prontas e ir chamando dentro da camada controllers ou no middleware

const status = {
  ok: 200,
  notFound: 404,
};

const message = {
  notFound: 'Pessoa palestrante não encontrada',
};

module.exports = { status, message };
