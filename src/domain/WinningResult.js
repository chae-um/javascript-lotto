const Bank = require('./Bank');
const LottoRewardCalculator = require('./LottoRewardCalculator');
const RateCalculator = require('./RateCalculator');

class WinningResult {
  #buyLottoInfo;

  #winningInfo;

  constructor({ buyLottoInfo, winningInfo }) {
    this.#buyLottoInfo = buyLottoInfo;
    this.#winningInfo = winningInfo;
  }

  static from({ buyLottoInfo, winningInfo }) {
    return new WinningResult({ buyLottoInfo, winningInfo });
  }

  #generateLottoMatchInfo() {
    const [buyLottoInfo, winningInfo] = [this.#buyLottoInfo, this.#winningInfo];
    return Bank.from({ buyLottoInfo, winningInfo }).compareLottos();
  }

  #generateRewardInfo() {
    return LottoRewardCalculator.from(this.#generateLottoMatchInfo()).calculateRewardInfo();
  }

  #generateRateOfReturn(winningAmount) {
    return RateCalculator.of(winningAmount, this.#buyLottoInfo.buyLottoPrice).createRateOfReturn();
  }

  generateWinningResult() {
    const { rewardResult, winningAmount } = this.#generateRewardInfo();
    const rateOfReturn = this.#generateRateOfReturn(winningAmount);
    return { rewardResult, rateOfReturn };
  }
}

module.exports = WinningResult;
