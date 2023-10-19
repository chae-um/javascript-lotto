const { ERROR_INSTANCES } = require('../constants/errors');
const {
  isEmptyInputValue,
  isExistSpace,
  isTypeOfNumber,
  isTypeOfNumbers,
} = require('../utils/validate/common');

const CommonValidator = {
  validateExistEmptyValue(value) {
    if (isEmptyInputValue(value)) throw ERROR_INSTANCES.common.existEmptyValue;
  },
  validateExistSpace(value) {
    if (isExistSpace(value)) throw ERROR_INSTANCES.common.existSpaces;
  },
  validateTypeOfNumber(value) {
    if (!isTypeOfNumber(value)) throw ERROR_INSTANCES.common.typeOfNumber;
  },
  validateTypeOfNumbers(numbers) {
    if (!isTypeOfNumbers(numbers)) throw ERROR_INSTANCES.common.typeOfNumber;
  },
};

module.exports = CommonValidator;
