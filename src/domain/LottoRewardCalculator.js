const { GAME_TERMS } = require('../constants/gameTerms');
const { SYMBOLS } = require('../constants/symbols');
const { countBy } = require('../utils/array');
const { reduceFromObject, update } = require('../utils/object');

class LottoRewardCalculator {
  #rewardTable = GAME_TERMS.rewardInfo;

  #rewardResult = this.#initRewardResult();

  #lottoMatchInfos;

  constructor(lottoMatchInfos) {
    this.#lottoMatchInfos = lottoMatchInfos;
  }

  static from(lottoMatchInfos) {
    return new LottoRewardCalculator(lottoMatchInfos);
  }

  #initRewardResult() {
    return reduceFromObject(
      this.#rewardTable,
      (initialRewardResult, [description]) => ({
        ...initialRewardResult,
        [`${description}`]: 0,
      }),
      {},
    );
  }

  #calculateRewardResult(prevRewardResult, [rewardKey, count]) {
    return update(prevRewardResult, rewardKey, (prevValue) => (prevValue ?? 0) + count);
  }

  #createRewardResult(rewardResultCount) {
    return reduceFromObject(rewardResultCount, this.#calculateRewardResult.bind(this), {
      ...this.#rewardResult,
    });
  }

  #calculateWinningAmount(prevWinningAmount, [rewardKey, count]) {
    const winningAmount = this.#rewardTable[rewardKey] * count;
    return prevWinningAmount + winningAmount;
  }

  #createWinningAmount(rewardResultCount) {
    return reduceFromObject(rewardResultCount, this.#calculateWinningAmount.bind(this), 0);
  }

  #createRewardResultKey({ count, hasBonusNumber }) {
    const bonusText = hasBonusNumber && count === 5 ? ', 보너스 볼 일치' : SYMBOLS.emptyString;
    const receiveRewardDescription = `${count}개 일치${bonusText}`;

    return (
      Object.keys(this.#rewardTable).find((rewardTableKey) =>
        rewardTableKey.startsWith(receiveRewardDescription),
      ) || null
    );
  }

  #createRewardResultKeys(lottoMatchInfos) {
    return lottoMatchInfos
      .map(this.#createRewardResultKey.bind(this))
      .filter((rewardKey) => rewardKey !== null);
  }

  #calculateRewardResultCount() {
    const rewardKeys = this.#createRewardResultKeys(this.#lottoMatchInfos);
    return countBy(rewardKeys);
  }

  calculateRewardInfo() {
    const rewardResultCount = this.#calculateRewardResultCount();
    return {
      rewardResult: this.#createRewardResult(rewardResultCount),
      winningAmount: this.#createWinningAmount(rewardResultCount),
    };
  }
}

module.exports = LottoRewardCalculator;
