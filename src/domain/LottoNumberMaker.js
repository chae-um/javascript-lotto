const { Random } = require('@woowacourse/mission-utils');

/**
 * '로또 번호 생성' 역할을 수행
 */
class LottoNumberMaker {
  #lottoRulesInfo;

  /**
   * LottoNumberMaker 인스턴스를 생성
   *
   * @param {Object} params - 로또 번호 생성 규칙을 포함한 객체
   * @param {number} params.minValue - 로또 번호의 최소값
   * @param {number} params.maxValue - 로또 번호의 최대값
   * @param {number} params.count - 생성할 로또 번호의 개수
   */
  constructor({ minValue, maxValue, count }) {
    this.#lottoRulesInfo = { minValue, maxValue, count };
  }

  /**
   * 로또 번호 생성 규칙을 기반으로 새로운 LottoNumberMaker 인스턴스를 생성하는 팩토리 메서드
   *
   * @param {Object} params - 로또 번호 생성 규칙을 포함한 객체
   * @param {number} params.minValue - 로또 번호의 최소값
   * @param {number} params.maxValue - 로또 번호의 최대값
   * @param {number} params.count - 생성할 로또 번호의 개수
   * @returns {LottoNumberMaker} 새로운 LottoNumberMaker 인스턴스를 반환
   */
  static from({ minValue, maxValue, count }) {
    return new LottoNumberMaker({ minValue, maxValue, count });
  }

  /**
   * 로또 번호를 생성하여 반환하는 메서드
   *
   * @returns {number[]} 생성된 로또 번호를 반환
   */
  createLottoNumbers() {
    const { minValue, maxValue, count } = this.#lottoRulesInfo;
    return Random.pickUniqueNumbersInRange(minValue, maxValue, count);
  }
}

module.exports = LottoNumberMaker;
