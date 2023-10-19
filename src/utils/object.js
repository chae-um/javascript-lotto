/**
 * 객체 복사본을 사용하여 콜백 함수를 실행하고 복사본을 반환하는 함수
 * @param {Object} object - 원본 객체
 * @param {Function} callback - 복사본 객체에 적용할 콜백 함수
 * @returns {Object} 변경된 복사본 객체
 */
const withObjectCopy = (object, callback) => {
  const copy = { ...object };
  callback(copy);
  return copy;
};

/**
 * 객체의 특정 키에 값을 설정하는 함수
 * @param {Object} object - 원본 객체
 * @param {string} key - 설정할 키
 * @param {*} value - 설정할 값
 * @returns {Object} 키와 값이 설정된 새로운 객체
 */
const objectSet = (object, key, value) =>
  withObjectCopy(object, (newObject) => {
    newObject[key] = value;
    return newObject;
  });

/**
 * 객체의 각 키와 값을 순회하면서 reduce를 수행하는 함수
 * @param {Object} object - 원본 객체
 * @param {Function} callback - 각 키와 값에 적용될 콜백 함수
 * @param {*} initData - reduce의 초기 값
 * @returns {*} reduce 결과
 */
const reduceFromObject = (object, callback, initData) =>
  Object.entries(object).reduce(callback, initData);

/**
 * 객체의 특정 키의 값을 수정 함수를 통해 변경하는 함수
 * @param {Object} object - 원본 객체
 * @param {string} key - 수정할 키
 * @param {Function} modifyFunction - 키의 값을 변경하는 함수
 * @returns {Object} 키의 값이 변경된 새로운 객체
 */
const update = (object, key, modifyFunction) => {
  const value = object[key];
  const newValue = modifyFunction(value);
  return objectSet(object, key, newValue);
};

module.exports = { withObjectCopy, reduceFromObject, update, objectSet };
