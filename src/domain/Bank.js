const { withObjectCopy } = require('../utils/object');

class Bank {
  #lottoMatchInfo = {
    hasBonusNumber: false,
    count: 0,
  };

  #buyLottoInfo;

  #winningInfo;

  constructor({ buyLottoInfo, winningInfo }) {
    this.#buyLottoInfo = buyLottoInfo;
    this.#winningInfo = winningInfo;
  }

  static from({ buyLottoInfo, winningInfo }) {
    return new Bank({ buyLottoInfo, winningInfo });
  }

  #isCorrectLottoNumber(oneLottoNumber) {
    return this.#winningInfo.winningLottoNumber.includes(oneLottoNumber);
  }

  #isCorrectBonusNumber(oneLottoNumber) {
    return this.#winningInfo.bonusNumber === oneLottoNumber;
  }

  #updateLottoMatchInfo(prevLottoMatchInfo, oneLottoNumber) {
    return withObjectCopy(prevLottoMatchInfo, (newLottoMatchInfo) => {
      if (this.#isCorrectLottoNumber(oneLottoNumber)) newLottoMatchInfo.count += 1;
      if (this.#isCorrectBonusNumber(oneLottoNumber)) newLottoMatchInfo.hasBonusNumber = true;
      return newLottoMatchInfo;
    });
  }

  #createLottoMatchInfo(lottoNumbers) {
    return lottoNumbers.map((lottoNumber) =>
      lottoNumber.reduce(this.#updateLottoMatchInfo.bind(this), { ...this.#lottoMatchInfo }),
    );
  }

  compareLottos() {
    const newLottoMatchInfo = this.#createLottoMatchInfo(this.#buyLottoInfo.lottoNumbers);
    return newLottoMatchInfo;
  }
}

module.exports = Bank;
