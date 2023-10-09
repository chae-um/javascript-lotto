const withObjectCopy = (object, callback) => {
  const copy = { ...object };
  callback(copy);
  return copy;
};

module.exports = { withObjectCopy };
