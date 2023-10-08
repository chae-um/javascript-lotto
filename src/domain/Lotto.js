/* eslint-disable class-methods-use-this */
const { ascendingNumbers } = require('../utils/array');

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
  }

  // TODO: 추가 기능 구현
  getLottoNumbers() {
    return this.#numbers;
  }
}

module.exports = Lotto;
