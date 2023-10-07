const { ERROR_INSTANCES } = require('../constants/errors');
const { isEmptyInputValue, isExistSpace } = require('../utils/validate');

const CommonValidator = {
  validateExistEmptyValue(value) {
    if (isEmptyInputValue(value)) throw ERROR_INSTANCES.common.existEmptyValue;
  },
  validateExistSpace(value) {
    if (isExistSpace(value)) throw ERROR_INSTANCES.common.existSpaces;
  },
};

module.exports = CommonValidator;
