const withArrayCopy = (array, callback) => {
  const newArray = [...array];
  callback(newArray);
  return newArray;
};

const ascendingNumbers = (numbers) =>
  withArrayCopy(numbers, (newNumbers) => {
    newNumbers.sort((numberA, numberB) => numberA - numberB);
  });

const countBy = (array, callback) =>
  array.reduce((hashTable, element) => {
    const key = callback ? callback(element) : element;
    hashTable[key] = (hashTable[key] ?? 0) + 1;
    return hashTable;
  }, {});

const intersection = (firstArray, secondArray) =>
  firstArray.reduce(
    (result, element) =>
      secondArray.includes(element) && !result.includes(element)
        ? [...result, element]
        : [...result],
    [],
  );

module.exports = { withArrayCopy, ascendingNumbers, countBy, intersection };
