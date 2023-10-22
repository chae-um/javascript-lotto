import { ERROR_MESSAGES } from '../../constants/Messages.js';
import { CORE_SYSTEM } from '../../constants/System.js';
import ValidationError from '../error/ValidationError.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    Lotto.validate(numbers);
    this.#numbers = numbers;
  }

  static validate(numbers) {
    if (numbers.length !== CORE_SYSTEM.LOTTO_COUNT) {
      throw new ValidationError(ERROR_MESSAGES.COUNT);
    }

    const numbersSet = new Set(numbers);
    if (numbers.length !== numbersSet.size) {
      throw new ValidationError(ERROR_MESSAGES.DUPLICATION_SECOND);
    }

    if (numbers.some((number) => number < CORE_SYSTEM.START_NUM || number > CORE_SYSTEM.END_NUM)) {
      throw new ValidationError(ERROR_MESSAGES.RANGE);
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
