const { runGenerator } = require('./utils/runGenerator');
const { InputView, OutputView } = require('./views');
const {
  BuyLottoPriceValidator,
  LottoNumberValidator,
  BonusNumberValidator,
} = require('./validator');
const { GenerationLottoService } = require('./services');
const { SYMBOLS } = require('./constants/symbols');

class App {
  #inputView = InputView;

  #outputView = OutputView;

  #generationLottoService = GenerationLottoService;

  *#askBuyLottoPrice() {
    const inputBuyLottoPrice = yield (resolve) => this.#inputView.readBuyLottoPrice(resolve);
    BuyLottoPriceValidator.from(inputBuyLottoPrice).validateBuyLottoPrice();
    return Number(inputBuyLottoPrice);
  }

  *#askWinningLottoNumber() {
    const inputWinningLottoNumber = yield (resolve) =>
      this.#inputView.readWinningLottoNumbers(resolve);
    const winningLottoNumber = inputWinningLottoNumber.split(SYMBOLS.comma).map(Number);
    LottoNumberValidator.from(winningLottoNumber).validateLottoNumber();
    return winningLottoNumber;
  }

  *#askBonusNumber(lottoNumbers) {
    const inputBonusNumber = yield (resolve) => this.#inputView.readBonusNumber(resolve);
    BonusNumberValidator.of(inputBonusNumber, lottoNumbers).validateBonusNumber();
    return Number(inputBonusNumber);
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
    const bonusNumber = yield* this.#askBonusNumber(winningLottoNumber);
    console.log(bonusNumber);
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
