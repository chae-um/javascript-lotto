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
  lottoNumber: Object.freeze({
    invalidRange: new AppError(ERROR_MESSAGE.lottoNumber.invalidRange),
    invalidCount: new AppError(ERROR_MESSAGE.lottoNumber.invalidCount),
    existDuplicateNumber: new AppError(ERROR_MESSAGE.lottoNumber.existDuplicateNumber),
  }),
});

module.exports = { ERROR_INSTANCES };
