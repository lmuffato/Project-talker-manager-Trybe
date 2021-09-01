// Caso o campo não seja passado ou esteja vazio retorne um código de status 400,
// com o seguinte corpo:
//   "message": "O campo \"password\" é obrigatório"
// Caso a senha não tenha pelo menos 6 caracteres retorne um código de status 400,
// com o seguinte corpo:
//   "message": "O \"password\" deve ter pelo menos 6 caracteres"