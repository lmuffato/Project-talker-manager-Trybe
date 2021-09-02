function checkDateSplitted(date, separator) {
  const dateSplitted = date.split(separator);
  const validDay = Number(dateSplitted[0]) <= 31 || Number(dateSplitted[0]) >= 1;
  const validMonth = Number(dateSplitted[1]) <= 12 || Number(dateSplitted[1]) >= 1;
  const validYear = Number(dateSplitted[2]) <= new Date().getFullYear();
  return validDay && validMonth && validYear;
}

module.exports = {
  validateDateFormat(date, format) {
    if (format.length === 0) throw new Error('O formato da data é necessário');

    switch (format) {
      case 'dd/mm/yyyy':
        return checkDateSplitted(date, '/');
    
      default:
        break;
    }
  },
};
