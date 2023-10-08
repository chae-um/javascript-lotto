const AppError = require('../errors/AppError');
const { ERROR_MESSAGE } = require('./messages');

const ERROR_INSTANCES = Object.freeze({
  common: Object.freeze({
    existEmptyValue: new AppError(ERROR_MESSAGE.common.existEmptyValue),
    existSpaces: new AppError(ERROR_MESSAGE.common.existSpaces),
    typeOfNumber: new AppError(ERROR_MESSAGE.common.typeOfNumber),
  }),
  buyLottoPrice: Object.freeze({
    invalidRange: new AppError(ERROR_MESSAGE.buyLottoPrice.invalidRange),
    invalidUnit: new AppError(ERROR_MESSAGE.buyLottoPrice.invalidUnit),
  }),
  winningLottoNumber: Object.freeze({
    invalidRange: new AppError(ERROR_MESSAGE.winningLottoNumber.invalidRange),
    invalidCount: new AppError(ERROR_MESSAGE.winningLottoNumber.invalidCount),
    existDuplicateNumber: new AppError(ERROR_MESSAGE.winningLottoNumber.existDuplicateNumber),
  }),
});

module.exports = { ERROR_INSTANCES };
