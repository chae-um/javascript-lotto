class LottoNumberCalculator {
  #result;

  constructor(userLottoNumbers, lottoNumbers, bonusNumber) {
    this.userLottoNumbers = userLottoNumbers;
    this.lottoNumbers = lottoNumbers.map((num) => Number(num));
    this.bonusNumber = Number(bonusNumber);
    this.#result = {
      3: 0,
      4: 0,
      5: 0,
      bonus: 0,
      6: 0,
    };
  }

  run() {
    this.userLottoNumbers.forEach((userLottoNumber) => {
      const matchCount = userLottoNumber.reduce((acc, cur) => {
        if (this.lottoNumbers.includes(cur)) acc += 1;
        return acc;
      }, 0);
      if (matchCount < 3) return;

      if (this.#isFiveNumbersAndBonusMatching(matchCount, userLottoNumber)) {
        this.#result.bonus += 1;
        return;
      }
      this.#result[matchCount] += 1;
    });
  }

  getResult() {
    return this.#result;
  }

  #isFiveNumbersAndBonusMatching(matchCount, userLottoNumber) {
    return matchCount === 5 && userLottoNumber.includes(this.bonusNumber);
  }
}

export default LottoNumberCalculator;
