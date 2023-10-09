const { GAME_TERMS } = require('../constants/gameTerms');
const { SYMBOLS } = require('../constants/symbols');
const { withObjectCopy } = require('../utils/object');

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
    return Object.entries(this.#rewardTable).reduce(
      (initialRewardResult, [description]) => ({
        ...initialRewardResult,
        [`${description}`]: 0,
      }),
      {},
    );
  }

  #createNewRewardInfo(prevRewardInfo, rewardResultKey) {
    return withObjectCopy(prevRewardInfo, (newRewardInfo) => {
      const receivedWinningAmount = this.#rewardTable[rewardResultKey];
      newRewardInfo.rewardResult[rewardResultKey] += 1;
      newRewardInfo.winningAmount += receivedWinningAmount;
      return newRewardInfo;
    });
  }

  #setRewardInfo(prevRewardInfo, rewardResultKey) {
    return !rewardResultKey
      ? prevRewardInfo
      : this.#createNewRewardInfo(prevRewardInfo, rewardResultKey);
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

  #updateRewardInfo(prevRewardInfo, lottoMatchInfo) {
    const rewardResultKey = this.#createRewardResultKey(lottoMatchInfo);
    return this.#setRewardInfo(prevRewardInfo, rewardResultKey);
  }

  calculateRewardInfo() {
    return this.#lottoMatchInfos.reduce(this.#updateRewardInfo.bind(this), {
      rewardResult: { ...this.#rewardResult },
      winningAmount: 0,
    });
  }
}

module.exports = LottoRewardCalculator;
