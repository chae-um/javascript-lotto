const { GAME_TERMS } = require('../constants/gameTerms');

/**
 * '수익률 계산'을 수행
 */
class RateCalculator {
  #winningAmount;

  #buyLottoPrice;

  /**
   * @constructor
   * @param {number} winningAmount - 당첨 금액
   * @param {number} buyLottoPrice - 구매한 로또의 가격
   */
  constructor(winningAmount, buyLottoPrice) {
    this.#winningAmount = winningAmount;
    this.#buyLottoPrice = buyLottoPrice;
  }

  /**
   * RateCalculator 인스턴스를 생성하는 정적 팩토리 메서드
   * @param {number} winningAmount - 당첨 금액
   * @param {number} buyLottoPrice - 구매한 로또의 가격
   * @returns {RateCalculator} RateCalculator 인스턴스
   */
  static of(winningAmount, buyLottoPrice) {
    return new RateCalculator(winningAmount, buyLottoPrice);
  }

  /**
   * 수익률을 계산하여 반환하는 메서드
   * @returns {number} 계산된 수익률
   * @private
   */
  #calculateRateOfReturn() {
    return (this.#winningAmount / this.#buyLottoPrice) * GAME_TERMS.rateOfReturn.percent;
  }

  /**
   * 수익률을 계산 후 소수점 단위에 맞춰 반환하는 메서드
   * @returns {number} 수익률 (정수 또는 소수점 반올림 값)
   */
  createRateOfReturn() {
    const rateOfReturn = this.#calculateRateOfReturn();
    if (Number.isInteger(rateOfReturn)) return rateOfReturn;
    return rateOfReturn.toFixed(GAME_TERMS.rateOfReturn.decimal);
  }
}

module.exports = RateCalculator;
