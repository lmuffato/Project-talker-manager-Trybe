class Talker {
  constructor(id, name, age, talk) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.talk = talk;
    this.validation();
  }

  validateName() {
    if (!this.name) throw new Error('O campo "name" é obrigatório');
    if (this.name.length < 3) throw new Error('O "name" deve ter pelo menos 3 caracteres');
    return true;
  }

  validateAge() {
    if (!this.age) throw new Error('O campo "age" é obrigatório');
    if (this.age < 18) throw new Error('A pessoa palestrante deve ser maior de idade');
    return true;
  }

  validateWatchedAt() {
    const { watchedAt } = this.talk;
    const dates = watchedAt.split('/');

    const day = dates[0];
    const month = dates[1];
    const year = dates[2];

    if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
      throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
    }

    return true;
  }

  validateRate() {
    const { rate } = this.talk;

    if (rate < 1 || rate > 5) throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');

    return true;
  }

  validateTalk() {
    if (!this.talk || !this.talk.rate || !this.talk.watchedAt) {
      throw new Error('O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios');
    }

    this.validateWatchedAt();
    this.validateRate();
  }

  validation() {
    this.validateName();
    this.validateAge();
    this.validateTalk();
  }
}

module.exports = Talker;
