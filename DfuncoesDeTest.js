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

const login = { email: 'email@email.com', password: '123456' };
const { email, password } = login;

 const validateLogin = (email, password) => {
  if (!email) { return response.status(404)
  .json({ message: 'O campo "password" é obrigatório' });
}


  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const validEmail = regex.test(email);
  return validEmail;
 };

//  console.log(validateLogin(email, password));

console.log(password.length);



const validadeEmail = () => {
  if (!email || email === '' || email === null) {
    return response.status(404)
    .json({ message: 'O campo "email" é obrigatório' });
  };
}


if (!password || password === '' || password === null) {
  return response.status(404)
  .json({ message: 'message": "O campo \"password\" é obrigatório' });
};

const validPassword = (password) => {
  if (password.length >= 6) { return true; }
  return false;
};