const { Console } = require('@woowacourse/mission-utils');
const { runGenerator } = require('./utils/runGenerator');
const { InputView, OutputView } = require('./views');
const { BuyLottoPriceValidator } = require('./validator');
const { GenerationLottoService } = require('./services');
const LottoNumberValidator = require('./validator/LottoNumberValidator');
const { SYMBOLS } = require('./constants/symbols');

class App {
  #inputView = InputView;

  #outputView = OutputView;

  #generationLottoService = GenerationLottoService;

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

  *#askWinningLottoNumber() {
    try {
      const inputWinningLottoNumber = yield (resolve) =>
        this.#inputView.readWinningLottoNumbers(resolve);
      const winningLottoNumber = inputWinningLottoNumber.split(SYMBOLS.comma).map(Number);
      LottoNumberValidator.from(winningLottoNumber).validateLottoNumber();
      return winningLottoNumber;
    } catch (error) {
      this.#handleError(error);
    }
  }

  #askGenerationLottos(buyLottoPrice) {
    return this.#generationLottoService.generateLottoNumbers(buyLottoPrice);
  }

  #askPrintGenerationLottoNumbers({ lottoCount, lottoNumbers }) {
    this.#outputView.printGenerationLottoNumbers({ lottoCount, lottoNumbers });
  }

  *#processGame() {
    const buyLottoPrice = yield* this.#askBuyLottoPrice();
    const { lottoCount, lottoNumbers } = this.#askGenerationLottos(buyLottoPrice);
    this.#askPrintGenerationLottoNumbers({ lottoCount, lottoNumbers });
    const winningLottoNumber = yield* this.#askWinningLottoNumber();
    console.log(winningLottoNumber);
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
