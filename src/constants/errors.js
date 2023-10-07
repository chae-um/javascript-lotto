const AppError = require('../errors/AppError');
const { ERROR_MESSAGE } = require('./messages');

const ERROR_INSTANCES = Object.freeze({
  common: Object.freeze({
    existEmptyValue: new AppError(ERROR_MESSAGE.common.existEmptyValue),
    existSpaces: new AppError(ERROR_MESSAGE.common.existSpaces),
  }),
  buyLottoPrice: Object.freeze({
    invalidRange: new AppError(ERROR_MESSAGE.buyLottoPrice.invalidRange),
    invalidUnit: new AppError(ERROR_MESSAGE.buyLottoPrice.invalidUnit),
  }),
});

module.exports = { ERROR_INSTANCES };
