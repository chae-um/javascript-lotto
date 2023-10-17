/* eslint-disable class-methods-use-this */
const { ERROR_INSTANCES } = require('../constants/errors');
const { ascendingNumbers } = require('../utils/array');
const { isDuplicateLottoNumbers } = require('../utils/validate/lottoNumber');

/**
 * '한 개의 로또 생성' 역할을 수행
 */
class Lotto {
  /**
   * 생성된 로또 번호
   * @type {number[]}
   */
  #numbers;

  /**
   * Lotto 인스턴스를 생성
   *
   * @param {number[]} numbers - 로또 번호들이 포함된 배열
   */
  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  /**
   * 오름차순으로 정렬된 로또 번호를 이용해 Lotto 인스턴스를 생성하는 팩토리 메서드
   *
   * @param {number[]} numbers - 로또 번호를 포함하는 배열
   * @returns {Lotto} 새로운 Lotto 인스턴스를 반환
   */
  static fromByAscending(numbers) {
    return new Lotto(ascendingNumbers(numbers));
  }

  /**
   * 주어진 로또 번호 배열이 유효한지 검증하는 메서드
   *
   * @param {number[]} numbers - 검증할 로또 번호를 포함하는 배열
   */
  validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 ');
    }

    if (isDuplicateLottoNumbers(numbers)) {
      throw ERROR_INSTANCES.lottoNumber.existDuplicateNumber;
    }
  }

  /**
   * 현재 Lotto 인스턴스의 로또 번호를 가져오는 메서드
   *
   * @returns {number[]} 로또 번호를 포함하는 배열을 반환
   */
  getLottoNumbers() {
    return this.#numbers;
  }
}

module.exports = Lotto;
