import LottoNumberCalculator from '../utils/LottoNumberCalculator.js';
import LottoNumberGenerator from '../utils/LottoNumberGenerator.js';

class LottoModel {
  #userLottoNumbers;

  generateLottoNumbers(purchaseAmount) {
    const count = purchaseAmount / 1000;
    this.#userLottoNumbers = LottoNumberGenerator.run(count);
    return this.#userLottoNumbers;
  }

  getWinningResult(lottoNumbers, bonusNumber) {
    const lottoNumberCalculator = new LottoNumberCalculator(
      this.#userLottoNumbers,
      lottoNumbers,
      bonusNumber,
    );
    lottoNumberCalculator.run();
    const winningResult = lottoNumberCalculator.getResult();

    return winningResult;
  }
}

export default LottoModel;
