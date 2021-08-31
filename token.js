function makeid() {
    let text = '';
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i += 1) text += char.charAt(Math.floor(Math.random() * char.length));
    return text;
  }

  module.exports = makeid;
  
// função gerar string extraida do site: https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/