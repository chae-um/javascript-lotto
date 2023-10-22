import LottoNumberGenerator from '../utils/LottoNumberGenerator.js';

class LottoModel {
  #lottoNumbers;

  #PurchaseAmount;

  generateLottoNumbers(purchaseAmount) {
    const count = purchaseAmount / 1000;
    this.#lottoNumbers = LottoNumberGenerator.run(count);
    return this.#lottoNumbers;
  }
}

export default LottoModel;
