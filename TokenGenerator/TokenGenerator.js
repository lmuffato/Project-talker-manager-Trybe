const TokenGenerator = () => {
    const UPPER_CASE_LETTERS = 'ABCDEFGIJKLMNOPQRSTUVWXYZ';
    const LOWER_CASE_LETTERS = UPPER_CASE_LETTERS.toLowerCase();
    const NUMBERS = '1234567890';
    const ALPHA_NUMERICAL_CHARS = NUMBERS.concat(LOWER_CASE_LETTERS, UPPER_CASE_LETTERS);
  
    let token = '';
  
    for (let index = 0; index < 16; index += 1) {
      const randomIndex = Math.floor(Math.random() * ALPHA_NUMERICAL_CHARS.length);
      token += ALPHA_NUMERICAL_CHARS[randomIndex];
    }
  
    return token;
  };

  module.exports = TokenGenerator;