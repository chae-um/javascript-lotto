const { GAME_TERMS } = require('../constants/gameTerms');

class RateCalculator {
  #winningAmount;

  #buyLottoPrice;

  constructor(winningAmount, buyLottoPrice) {
    this.#winningAmount = winningAmount;
    this.#buyLottoPrice = buyLottoPrice;
  }

  static of(winningAmount, buyLottoPrice) {
    return new RateCalculator(winningAmount, buyLottoPrice);
  }

  #calculateRateOfReturn() {
    return (this.#winningAmount / this.#buyLottoPrice) * GAME_TERMS.rateOfReturn.percent;
  }

  createRateOfReturn() {
    const rateOfReturn = this.#calculateRateOfReturn();
    if (Number.isInteger(rateOfReturn)) return rateOfReturn;
    return rateOfReturn.toFixed(GAME_TERMS.rateOfReturn.decimal);
  }
}

module.exports = RateCalculator;
