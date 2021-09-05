// referencia para a criação do codigo abaixo : https://www.codegrepper.com/code-examples/javascript/javascript+token+generator

const generateToken = (tokenNumber) => {
  let token = '';
  const code = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
  const codeLength = code.length;
  for (let index = 0; index < tokenNumber; index += 1) {
    token += code.charAt(Math.floor(Math.random() * codeLength)); 
// (Math.random() * (code.length - 1)).toFixed(0);
  }
  return token;
};

module.exports = {
  generateToken,
};
