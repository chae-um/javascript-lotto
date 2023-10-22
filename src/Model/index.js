import LottoNumberCalculator from '../utils/LottoNumberCalculator.js';
import LottoNumberGenerator from '../utils/LottoNumberGenerator.js';

class LottoModel {
  #lottoNumbers;

  generateLottoNumbers(purchaseAmount) {
    const count = purchaseAmount / 1000;
    this.#lottoNumbers = LottoNumberGenerator.run(count);
    return this.#lottoNumbers;
  }

  getWinningResult(lottoNumbers, bonusNumber) {
    const lottoNumberCalculator = new LottoNumberCalculator(
      this.#lottoNumbers,
      lottoNumbers,
      bonusNumber,
    );
    lottoNumberCalculator.run();
    const winningResult = lottoNumberCalculator.getResult();

    return winningResult;
  }
}

export default LottoModel;
