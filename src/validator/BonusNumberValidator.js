const { ERROR_INSTANCES } = require('../constants/errors');
const {
  isValidLottoNumberRange,
  isDuplicateLottoNumbers,
} = require('../utils/validate/lottoNumber');
const CommonValidator = require('./CommonValidator');

class BonusNumberValidator {
  #commonValidator = CommonValidator;

  #bonusNumber;

  #lottoNumbers;

  constructor(bonusNumber, lottoNumbers) {
    this.#bonusNumber = bonusNumber;
    this.#lottoNumbers = lottoNumbers;
  }

  static of(bonusNumber, lottoNumbers) {
    return new BonusNumberValidator(bonusNumber, lottoNumbers);
  }

  #validateBonusNumberRange() {
    if (!isValidLottoNumberRange(this.#bonusNumber)) throw ERROR_INSTANCES.lottoNumber.invalidRange;
  }

  #validateDuplicateNumber() {
    if (isDuplicateLottoNumbers([...this.#lottoNumbers, Number(this.#bonusNumber)]))
      throw ERROR_INSTANCES.lottoNumber.existDuplicateNumber;
  }

  validateBonusNumber() {
    this.#commonValidator.validateExistEmptyValue(this.#bonusNumber);
    this.#commonValidator.validateExistSpace(this.#bonusNumber);
    this.#commonValidator.validateTypeOfNumber(this.#bonusNumber);
    this.#validateBonusNumberRange();
    this.#validateDuplicateNumber();
  }
}

module.exports = BonusNumberValidator;
