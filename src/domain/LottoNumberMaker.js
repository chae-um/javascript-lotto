const { Random } = require('@woowacourse/mission-utils');

class LottoNumberMaker {
  #lottoRulesInfo;

  constructor({ minValue, maxValue, count }) {
    this.#lottoRulesInfo = { minValue, maxValue, count };
  }

  static from({ minValue, maxValue, count }) {
    return new LottoNumberMaker({ minValue, maxValue, count });
  }

  createLottoNumbers() {
    const { minValue, maxValue, count } = this.#lottoRulesInfo;
    return Random.pickUniqueNumbersInRange(minValue, maxValue, count);
  }
}

module.exports = LottoNumberMaker;
