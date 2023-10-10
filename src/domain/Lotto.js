/* eslint-disable class-methods-use-this */
const { ERROR_INSTANCES } = require('../constants/errors');
const { ascendingNumbers } = require('../utils/array');
const { isDuplicateLottoNumbers } = require('../utils/validate/lottoNumber');

class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  static fromByAscending(numbers) {
    return new Lotto(ascendingNumbers(numbers));
  }

  validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }

    if (isDuplicateLottoNumbers(numbers)) {
      throw ERROR_INSTANCES.lottoNumber.existDuplicateNumber;
    }
  }

  // TODO: 추가 기능 구현
  getLottoNumbers() {
    return this.#numbers;
  }
}

module.exports = Lotto;
