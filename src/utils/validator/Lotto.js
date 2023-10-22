import CORE_SYSTEM from '../../constants/System.js';
import ValidationError from '../error/ValidationError.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    Lotto.validate(numbers);
    this.#numbers = numbers;
  }

  static validate(numbers) {
    if (numbers.length !== CORE_SYSTEM.LOTTO_COUNT) {
      throw new ValidationError('로또 번호는 6개여야 합니다.');
    }

    const numbersSet = new Set(numbers);
    if (numbers.length !== numbersSet.size) {
      throw new ValidationError('로또 번호는 중복되지 않아야 합니다.');
    }

    if (numbers.some((number) => number < CORE_SYSTEM.START_NUM || number > CORE_SYSTEM.END_NUM)) {
      throw new ValidationError('로또 번호의 숫자 범위는 1~45까지 입니다.');
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
