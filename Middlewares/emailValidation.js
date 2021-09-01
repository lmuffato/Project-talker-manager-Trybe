// Caso o campo não seja passado ou esteja vazio retorne um código de status 400,
// com o seguinte corpo:
//   "message": "O campo \"email\" é obrigatório"
// Caso o email passado não seja um email válido retorne um código de status 400,
// com o seguinte corpo:
//   "message": "O \"email\" deve ter o formato \"email@email.com\""