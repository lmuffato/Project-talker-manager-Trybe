const myArray = [
  { name: 'Henrique Albuquerque', age: 62, id: 1, talk: { watchedAt: '23/10/2020', rate: 5 } },
  { name: 'Heloísa Albuquerque', age: 67, id: 2, talk: { watchedAt: '23/10/2020', rate: 5 } },
  { name: 'Ricardo Xavier Filho', age: 33, id: 3, talk: { watchedAt: '23/10/2020', rate: 5 } },
  { name: 'Marcos Costa', age: 24, id: 4, talk: { watchedAt: '23/10/2020', rate: 5 } },
];

const filterById = (array, idRequest) => {
  try {
    return array.find((talker) => talker.id === idRequest);
  } catch (error) { return ({ message: error }); }
};

const teste = filterById(myArray, 2);

console.log(teste);

// const recipe = allRecipes.find((idRequest) => idRequest.id === parseInt(id));
//     if (!recipe) return res.status(404).json({ message: 'Recipe not found!'});