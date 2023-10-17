const { intersection } = require('../utils/array');

class Bank {
  #buyLottoInfo;

  #winningInfo;

  constructor({ buyLottoInfo, winningInfo }) {
    this.#buyLottoInfo = buyLottoInfo;
    this.#winningInfo = winningInfo;
  }

  static from({ buyLottoInfo, winningInfo }) {
    return new Bank({ buyLottoInfo, winningInfo });
  }

  #calculateMatchingNumbers(lottoNumber) {
    return intersection(lottoNumber, this.#winningInfo.winningLottoNumber).length;
  }

  #isCorrectBonusNumber(lottoNumber) {
    return lottoNumber.includes(this.#winningInfo.bonusNumber);
  }

  compareLottos() {
    return this.#buyLottoInfo.lottoNumbers.map((lottoNumber) => ({
      count: this.#calculateMatchingNumbers(lottoNumber),
      hasBonusNumber: this.#isCorrectBonusNumber(lottoNumber),
    }));
  }
}

module.exports = Bank;
