const Bank = require('./Bank');
const LottoRewardCalculator = require('./LottoRewardCalculator');
const RateCalculator = require('./RateCalculator');

/**
 * '로또 당첨 결과 계산'의 역할을 수행
 */
class WinningResult {
  #buyLottoInfo;

  #winningInfo;

  /**
   * @constructor
   * @param {Object} params - 로또 구매 정보와 당첨 정보가 포함된 객체
   * @param {Object} options.buyLottoInfo - 로또 구매 정보
   * @param {Object} options.winningInfo - 당첨 정보
   */
  constructor({ buyLottoInfo, winningInfo }) {
    this.#buyLottoInfo = buyLottoInfo;
    this.#winningInfo = winningInfo;
  }

  /**
   * WinningResult 인스턴스를 생성하여 반환하는 정적 팩토리 메서드
   * @param {Object} options - 구성 옵션
   * @param {Object} options.buyLottoInfo - 로또 구매 정보
   * @param {Object} options.winningInfo - 당첨 정보
   * @returns {WinningResult} WinningResult 인스턴스
   */
  static from({ buyLottoInfo, winningInfo }) {
    return new WinningResult({ buyLottoInfo, winningInfo });
  }

  /**
   * 로또 번호 일치 정보(lottoMatchInfo)를 생성하여 반환하는 메서드
   * @returns {Array} 로또 번호 일치 정보(lottoMatchInfo) 배열
   * @private
   */
  #generateLottoMatchInfo() {
    const [buyLottoInfo, winningInfo] = [this.#buyLottoInfo, this.#winningInfo];
    return Bank.from({ buyLottoInfo, winningInfo }).compareLottos();
  }

  /**
   * 당첨 보상 정보(rewardInfo)를 생성하여 반환하는 메서드
   * @returns {Object} 당첨 보상 정보(rewardInfo)
   * @private
   */
  #generateRewardInfo() {
    return LottoRewardCalculator.from(this.#generateLottoMatchInfo()).calculateRewardInfo();
  }

  /**
   * 수익률을 계산하여 반환하는 메서드
   * @param {number} winningAmount - 당첨 금액
   * @returns {number} 수익률 (정수 또는 소수점 반올림 값)
   * @private
   */
  #generateRateOfReturn(winningAmount) {
    return RateCalculator.of(winningAmount, this.#buyLottoInfo.buyLottoPrice).createRateOfReturn();
  }

  /**
   * 최종 당첨 결과(winningResult)를 생성하여 반환하는 메서드
   * @returns {Object} 최종 당첨 결과
   */
  generateWinningResult() {
    const { rewardResult, winningAmount } = this.#generateRewardInfo();
    const rateOfReturn = this.#generateRateOfReturn(winningAmount);
    return { rewardResult, rateOfReturn };
  }
}

module.exports = WinningResult;
