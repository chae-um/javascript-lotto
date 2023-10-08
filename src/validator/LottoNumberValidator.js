const { ERROR_INSTANCES } = require('../constants/errors');
const {
  isValidLottoNumbersRange,
  isDuplicateLottoNumbers,
  isValidLottoCount,
} = require('../utils/validate/lottoNumber');
const CommonValidator = require('./CommonValidator');

class LottoNumberValidator {
  #commonValidator = CommonValidator;

  #lottoNumbers;

  constructor(lottoNumber) {
    this.#lottoNumbers = lottoNumber;
  }

  static from(lottoNumber) {
    return new LottoNumberValidator(lottoNumber);
  }

  #validateLottoNumberRange() {
    if (!isValidLottoNumbersRange(this.#lottoNumbers))
      throw ERROR_INSTANCES.LottoNumber.invalidRange;
  }

  #validateDuplicateLottoNumber() {
    if (isDuplicateLottoNumbers(this.#lottoNumbers))
      throw ERROR_INSTANCES.LottoNumber.existDuplicateNumber;
  }

  #validateLottoNumberCount() {
    if (!isValidLottoCount(this.#lottoNumbers)) throw ERROR_INSTANCES.LottoNumber.invalidCount;
  }

  validateLottoNumber() {
    this.#commonValidator.validateExistEmptyValue(this.#lottoNumbers);
    this.#commonValidator.validateExistSpace(this.#lottoNumbers);
    this.#commonValidator.validateTypeOfNumbers(this.#lottoNumbers);
    this.#validateLottoNumberCount();
    this.#validateLottoNumberRange();
    this.#validateDuplicateLottoNumber();
  }
}

module.exports = LottoNumberValidator;
