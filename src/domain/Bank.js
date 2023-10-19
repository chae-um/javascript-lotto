const { intersection } = require('../utils/array');

/**
 * '결과 비교'의 역할을 수행
 */
class Bank {
  /**
   * 로또 구매 정보를 나타내는 객체
   * @type {object}
   * @property {number} buyLottoPrice - 구매한 로또 금액
   * @property {number[][]} lottoNumbers - 구매한 로또 번호들
   */
  #buyLottoInfo;

  /**
   * 당첨된 로또에 대한 정보를 나타내는 객체
   * @type {object}
   * @property {number[]} winningLottoNumber - 당첨 번호
   * @property {number} bonusNumber - 보너스 번호
   */
  #winningInfo;

  /**
   * Bank 인스턴스를 생성
   *
   * @param {Object} options - 은행을 생성하기 위한 옵션
   * @param {Object} options.buyLottoInfo - 구매된 로또에 대한 정보
   * @param {Object} options.winningInfo - 당첨된 로또에 대한 정보
   */
  constructor({ buyLottoInfo, winningInfo }) {
    this.#buyLottoInfo = buyLottoInfo;
    this.#winningInfo = winningInfo;
  }

  /**
   * 새로운 Bank 인스턴스를 생성하기 위한 팩토리 메서드
   *
   * @param {Object} options - 은행을 생성하기 위한 옵션
   * @param {Object} options.buyLottoInfo - 구매된 로또에 대한 정보
   * @param {Object} options.winningInfo - 당첨된 로또에 대한 정보
   * @returns {Bank} 새로운 Bank 인스턴스를 반환
   */
  static from({ buyLottoInfo, winningInfo }) {
    return new Bank({ buyLottoInfo, winningInfo });
  }

  /**
   * 주어진 로또 번호와 당첨 번호 사이의 일치하는 번호를 계산하는 메서드
   *
   * @private
   * @param {number[]} lottoNumber - 확인할 로또 번호
   * @returns {number} 두 번호 간 일치 개수
   */
  #calculateMatchingNumbers(lottoNumber) {
    return intersection(lottoNumber, this.#winningInfo.winningLottoNumber).length;
  }

  /**
   * 주어진 로또 번호가 보너스 번호를 포함하는지 확인하는 메서드
   *
   * @private
   * @param {number[]} lottoNumber - 확인할 로또 번호
   * @returns {boolean} 보너스 번호 포함 여부
   */
  #isCorrectBonusNumber(lottoNumber) {
    return lottoNumber.includes(this.#winningInfo.bonusNumber);
  }

  /**
   * 구매된 로또 번호를 당첨 번호와 비교한 결과를 반환하는 메서드
   *
   * @returns {Object[]} 일치하는 번호의 개수(count)와 보너스 번호가 포함되어 있는지(hasBonusNumber)가 포함된 객체의 배열을 반환
   */
  compareLottos() {
    return this.#buyLottoInfo.lottoNumbers.map((lottoNumber) => ({
      count: this.#calculateMatchingNumbers(lottoNumber),
      hasBonusNumber: this.#isCorrectBonusNumber(lottoNumber),
    }));
  }
}

module.exports = Bank;
