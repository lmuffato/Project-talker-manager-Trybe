function gerarToken() {
    let text = '';
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i += 1) text += char.charAt(Math.floor(Math.random() * char.length));
    return text;
  }

function validateToken(req, res, next) {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length < 16) return res.status(401).json({ message: 'Token inválido' });

  next();
}

module.exports = {
  gerarToken, 
  validateToken,
};
  
// função gerar string extraida do site: https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/