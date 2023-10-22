export default class Computer {
  #winningNumbers;

  #winningBonusNumber;

  setWinningNumbers(winningNumbers, winningBonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#winningBonusNumber = winningBonusNumber;
  }

  compare(lottoNumbers) {
    const result = {
      fifthPrize: 0,
      fourthPrize: 0,
      thirdPrize: 0,
      secondPrize: 0,
      firstPrize: 0,
    };

    lottoNumbers.forEach((lottoNumber) => {
      const [count, bonusCount] = this.#calculate(lottoNumber);

      if (count === 6) result.firstPrize += 1;
      if (count === 5 && bonusCount) result.secondPrize += 1;
      if (count === 5 && !bonusCount) result.thirdPrize += 1;
      if (count === 4) result.fourthPrize += 1;
      if (count === 3) result.fifthPrize += 1;
    });
    return result;
  }

  #calculate(lottoNumber) {
    let count = 0;
    let bonusCount = 0;

    lottoNumber.forEach((number) => {
      if (this.#winningNumbers.includes(number)) count += 1;
      if (number === this.#winningBonusNumber) bonusCount += 1;
    });
    return [count, bonusCount];
  }
}
