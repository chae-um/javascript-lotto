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
    const LottoNumbers = this.#model.generateLottoNumbers(purchaseAmount);
    this.#view.printLotto(LottoNumbers);
  }
}

export default LottoController;
