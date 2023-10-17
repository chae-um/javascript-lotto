const withObjectCopy = (object, callback) => {
  const copy = { ...object };
  callback(copy);
  return copy;
};

const objectSet = (object, key, value) =>
  withObjectCopy(object, (newObject) => {
    newObject[key] = value;
    return newObject;
  });

const reduceFromObject = (object, callback, initData) =>
  Object.entries(object).reduce(callback, initData);

const update = (object, key, modifyFunction) => {
  const value = object[key];
  const newValue = modifyFunction(value);
  return objectSet(object, key, newValue);
};

module.exports = { withObjectCopy, reduceFromObject, update, objectSet };
