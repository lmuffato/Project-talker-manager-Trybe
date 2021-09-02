// O endpoint deverá retornar um código de status 200 com o token gerado,
// com o seguinte corpo:
//   "token": "7mqaVRXJSp886CGr"4

// https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/

    const generateToken = (_req, res) => {
      const randomChar = () => Math.random().toString(36).substr(2);
      const token = (randomChar() + randomChar()).substr(0, 16);
      return res.status(200).json({ token });
    };
    
    module.exports = generateToken;