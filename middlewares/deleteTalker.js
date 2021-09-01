async function deleteTalker(request, response) {
  const { id } = request.params;
  const talkerDBPath = './talker.json';
  const talkerDB = await readJsonReturnArray(talkerDBPath);
  const newTalkersList = returnArrayDifferentID(talkerDB, id);
  await writeAnObjectIntoAJSONFile(newTalkersList);
  return response.status(200).json(newTalkersList);
}

module.exports = deleteTalker;
