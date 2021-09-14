//  https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/
function Rand() {
  const token = Math.random().toString(36).substr(2);
  return token;
}

const token = () => (Rand() + Rand() + Rand() + Rand()).substr(0, 16);

module.exports = token();
