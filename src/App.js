const { Console } = require('@woowacourse/mission-utils');
const { runGenerator } = require('./utils/runGenerator');
const { InputView, OutputView } = require('./views');
const { BuyLottoPriceValidator } = require('./validator');

class App {
  #inputView;

  #outputView;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  #handleError(error) {
    this.#outputView.printError(error.message);
    Console.close();
  }

  *#askBuyLottoPrice() {
    try {
      const inputBuyLottoPrice = yield (resolve) => this.#inputView.readBuyLottoPrice(resolve);
      BuyLottoPriceValidator.from(inputBuyLottoPrice).validateBuyLottoPrice();
      return Number(inputBuyLottoPrice);
    } catch (error) {
      this.#handleError(error);
    }
  }

  *#processGame() {
    const buyLottoPrice = yield* this.#askBuyLottoPrice();
    console.log(buyLottoPrice);
  }

  *#run() {
    yield* this.#processGame();
  }

  play() {
    runGenerator(this.#run.bind(this));
  }
}

const app = new App();
app.play();

module.exports = App;
