import LottoModel from '../Model/index.js';
import View from '../View/index.js';

class LottoController {
  #model;

  #view;

  constructor() {
    this.#view = View;
    this.#model = new LottoModel();
  }

  async run() {
    const purchaseAmount = await this.#view.readPurchaseAmount();
    const userLottoNumbers = this.#model.generateLottoNumbers(purchaseAmount);
    this.#view.printLotto(userLottoNumbers);

    const lottoNumbers = (await this.#view.readLottoNumbers()).split(',');
    const bonusNumber = await this.#view.readBonusNumber(lottoNumbers);
    const winningResult = this.#model.getWinningResult(lottoNumbers, bonusNumber);
    this.#view.printResult(winningResult, purchaseAmount);
  }
}

export default LottoController;
