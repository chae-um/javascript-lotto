import View from '../View/index.js';

class LottoController {
  #view;

  constructor() {
    this.#view = View;
  }

  async run() {
    await this.#buyLotto();
  }

  async #buyLotto() {
    await this.#view.readPurchaseAmount();
  }
}

export default LottoController;
