// const HTTP_OK_STATUS = 200;
// const HTTP_NOTFOUND_STATUS = 404;
const HTTP_NOTOK_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    res.status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === ' ') {
    res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || parseFloat(age) % 1 !== 0) {
    res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

// }
// O campo talk deverá ser um objeto com as seguintes chaves:

// A chave watchedAt deve ser uma data no formato dd/mm/aaaa.

// Caso a data não respeito o formato dd/mm/aaaa retorne status 400, com o seguinte corpo:
// {
//   "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
// }
// A chave rate deve ser um inteiro de 1 à 5.

// Caso a nota não seja um inteiro de 1 à 5 retorne status 400, com o seguinte corpo:

// {
//   "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"
// }
// O campo talk é obrigatório e nenhuma das chaves citadas anteriormente podem ser vazias.

// Caso o campo não seja informado, esteja vazio ou então alguma de suas chaves não tenham sido informadas retorne status 400, com o seguinte corpo:

// {
//   "message": "O campo \"talk\" é obrigatório e \"watchedAt\" e \"rate\" não podem ser vazios"
// }
// Caso esteja tudo certo, retorne o status 201 e a pessoa cadastrada.

// O endpoint deve retornar o status 201 e a pessoa palestrante que foi cadastrada, da seguinte forma:

// {
//   "id": 1,
//   "name": "Danielle Santos",
//   "age": 56,
//   "talk": {
//     "watchedAt": "22/10/2019",
//     "rate": 5
//   }
// }

module.exports = {
  validateToken,
  validateName,
  validateAge,
};
