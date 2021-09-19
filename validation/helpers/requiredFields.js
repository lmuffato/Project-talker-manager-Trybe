function validateRequired(requiredFields, data) {
  const inexistsField = requiredFields.find((field) => !data[field]);
  if (inexistsField) throw new Error(`O campo "${inexistsField}" é obrigatório`); 
} 

module.exports = validateRequired;