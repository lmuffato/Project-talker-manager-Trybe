// Função que encontra o talker pelo seu id
// Importante não coincidir o nome da variável de entrada "id" com o nome da propriedade id do objeto
const filterById = async (array, idRequest) => {
  try {
    const filtred = array.find((talker) => talker.id === parseInt(idRequest, 10));
    return filtred;
  } catch (error) { return ({ message: error }); }
};

module.exports = { filterById };
