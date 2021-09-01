    // funcão para gerar token aleatório no javascript 
    // https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/

const tokenGeneration = (_req, res) => {
  const randomChar = () => Math.random().toString(36).substr(2);
  const token = (randomChar() + randomChar()).substr(0, 16);
  return res.status(200).json({ token });
};

module.exports = tokenGeneration;
