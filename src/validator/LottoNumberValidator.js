const { ERROR_INSTANCES } = require('../constants/errors');
const { SYMBOLS } = require('../constants/symbols');
const {
  isValidLottoNumbersRange,
  isDuplicateLottoNumbers,
  isValidLottoCount,
} = require('../utils/validate/lottoNumber');
const CommonValidator = require('./CommonValidator');

class LottoNumberValidator {
  #commonValidator = CommonValidator;

  #lottoNumbers;

  constructor(inputLottoNumber) {
    this.#lottoNumbers = inputLottoNumber;
  }

  static from(inputLottoNumber) {
    return new LottoNumberValidator(inputLottoNumber);
  }

  #validateLottoNumberRange() {
    if (!isValidLottoNumbersRange(this.#lottoNumbers))
      throw ERROR_INSTANCES.lottoNumber.invalidRange;
  }

  #validateDuplicateLottoNumber() {
    if (isDuplicateLottoNumbers(this.#lottoNumbers))
      throw ERROR_INSTANCES.lottoNumber.existDuplicateNumber;
  }

  #validateLottoNumberCount() {
    if (!isValidLottoCount(this.#lottoNumbers)) throw ERROR_INSTANCES.lottoNumber.invalidCount;
  }

  validateLottoNumber() {
    this.#commonValidator.validateExistEmptyValue(this.#lottoNumbers);
    this.#commonValidator.validateExistSpace(this.#lottoNumbers);
    this.#commonValidator.validateTypeOfNumbers(this.#lottoNumbers);
    this.#lottoNumbers = this.#lottoNumbers.split(SYMBOLS.comma).map(Number);
    this.#validateLottoNumberCount();
    this.#validateLottoNumberRange();
    this.#validateDuplicateLottoNumber();
  }
}

module.exports = LottoNumberValidator;
