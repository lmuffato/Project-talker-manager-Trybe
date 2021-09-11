/*
const crypto = require('crypto');

const myArray = [
  { name: 'Henrique Albuquerque', age: 62, id: 1, talk: { watchedAt: '23/10/2020', rate: 5 } },
  { name: 'Heloísa Albuquerque', age: 67, id: 2, talk: { watchedAt: '23/10/2020', rate: 5 } },
  { name: 'Ricardo Xavier Filho', age: 33, id: 3, talk: { watchedAt: '23/10/2020', rate: 5 } },
  { name: 'Marcos Costa', age: 24, id: 4, talk: { watchedAt: '23/10/2020', rate: 5 } },
];

const filterById = (array, idRequest) => {
  try {
    return array.find((talker) => talker.id === idRequest);
  } catch (error) { return ({ message: error }); }
};

// const teste = filterById(myArray, 2);

// console.log(teste);

const token = crypto.randomBytes(16).toString('hex');

console.log(token);

// const login = { email: 'email@email.com', password: '123456' };
// console.log(login);
*/

// POST - Rota para validar um login e gerar um token;
// app.post('/login', async (request, response) => {
//   const { email, password } = request.body;
//   if (emptyEmail(email)) { // Se o campo email estiver vazio retorna true
//     return response.status(404)
//   .json({ message: 'O campo "email" é obrigatório' });
//   }
//   if (emptyPassword(password)) { // Se o campo password estiver vazio retorna true
//     return response.status(404)
//   .json({ message: 'O campo "password" é obrigatório' });
//   }
//   if (validEmail(email) && validPassword(password)) { // A função de validação retorna true se o campo for válido;
//     const token = crypto.randomBytes(8).toString('hex'); // gera um token de 6 caracteres
//     return response.status(200).json({ token: `${token}` });
//   }
// });
/*
http POST :3000/login email='email@email.com' password='123456789' // (ok) retorna o token 
http POST :3000/login email='' password='123456789' // (error) retorna { message: 'O campo "email" é obrigatório' }
http POST :3000/login email='email@email.com' password='' // (error) retorna { message: 'O campo "password" é obrigatório' }
http POST :3000/login email='' password='' // (error) retorna { message: 'O campo "email" é obrigatório' }
*/

// const obj2 = '{"id": 1, "name": "Danielle Santos", "age": 56, "talk": { "watchedAt": "22/10/2019", "rate": 5 } }';
// const obj2 = '{"name": "Danielle Santos", "age": 56, "talk": { "watchedAt": "22/10/2019", "rate": 5 } }';
// const idObj = { id: 1 };
// const obj3 = JSON.parse(obj2);
// console.log(JSON.parse(obj));

// const obj['foo-bar'] = 1;

// const returnedTarget = Object.assign(idObj, obj3);

// console.log(returnedTarget);
