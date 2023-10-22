import { Random } from '@woowacourse/mission-utils';

export default class Lotto {
  #numbers;

  constructor(amount) {
    this.#numbers = Array.from({ length: amount }, () => this.#generate());
  }

  #generate() {
    return Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b);
  }

  getNumbers() {
    return this.#numbers;
  }
}
