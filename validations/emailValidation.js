const EMPTY_EMAIL_ERROR = 'O campo "email" é obrigatório';
const INVALID_EMAIL_ERROR = 'O "email" deve ter o formato "email@email.com"';

module.exports = (request, response, next) => {
  const { email } = request.body;
  const emailTesting = /[a-z]+@+[a-z]+\.+[a-z]/g.test(email);

  if (!email || email === '') return response.status(400).json({ message: EMPTY_EMAIL_ERROR });
  if (!emailTesting) return response.status(400).json({ message: INVALID_EMAIL_ERROR });

  next();
};
