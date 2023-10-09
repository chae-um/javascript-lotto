const withArrayCopy = (array, callback) => {
  const newArray = [...array];
  callback(newArray);
  return newArray;
};
const ascendingNumbers = (numbers) =>
  withArrayCopy(numbers, (newNumbers) => {
    newNumbers.sort((numberA, numberB) => numberA - numberB);
  });

module.exports = { ascendingNumbers };
