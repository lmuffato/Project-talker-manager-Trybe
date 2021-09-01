function tokenValidator(tk) {
  if (!tk) {
    return false;
  }
  if (tk.length !== 16 || tk === '                ') {
    return false;
  }
  return true;
}
