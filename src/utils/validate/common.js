const { SYMBOLS } = require('../../constants/symbols');

/**
 * 입력 값이 빈 값인지 확인하는 메서드
 * @param {string} value - 입력 값
 * @returns {boolean} 입력 값이 빈 값인지의 여부에 대한 boolean
 */
const isEmptyInputValue = (value) => value === SYMBOLS.emptyString;

/**
 * 입력 값에 공백이 있는지 확인하는 메서드
 * @param {string} value - 입력 값
 * @returns {boolean} 입력 값에 공백이 있는지의 여부에 대한 boolean
 */
const isExistSpace = (value) => value.includes(SYMBOLS.space);

/**
 * 입력 값이 숫자인지 확인하는 메서드
 * @param {string} value - 입력 값
 * @returns {boolean} 입력 값이 숫자인지의 여부에 대한 boolean
 */
const isTypeOfNumber = (value) => /^\d+$/.test(value);

/**
 * 배열 내 값이 모두 숫자 값인지 확인하는 메서드
 * @param {*} numbers
 * @returns {boolean} 배열 내 값이 숫자인지의 여부에 대한 boolean
 */
const isTypeOfNumbers = (value) =>
  value.split(SYMBOLS.comma).every((element) => isTypeOfNumber(element));

module.exports = {
  isTypeOfNumber,
  isExistSpace,
  isEmptyInputValue,
  isTypeOfNumbers,
};
