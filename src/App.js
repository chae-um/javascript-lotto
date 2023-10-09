const { Console } = require('@woowacourse/mission-utils');
const { runGenerator } = require('./utils/runGenerator');
const { InputView, OutputView } = require('./views');
const {
  BuyLottoPriceValidator,
  LottoNumberValidator,
  BonusNumberValidator,
} = require('./validator');
const { GenerationLottoService, WinningResultService } = require('./services');
const { SYMBOLS } = require('./constants/symbols');
const { ascendingNumbers } = require('./utils/array');

class App {
  #inputView = InputView;

  #outputView = OutputView;

  #generationLottoService = GenerationLottoService;

  #winningResultService = WinningResultService;

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

  #askCalculationWinningResult({ winningInfo, buyLottoInfo }) {
    return this.#winningResultService.generateWinningResult({ winningInfo, buyLottoInfo });
  }

  #askPrintGenerationLottoNumbers({ lottoCount, lottoNumbers }) {
    this.#outputView.printGenerationLottoNumbers({ lottoCount, lottoNumbers });
  }

  #askPrintWinningResult({ rewardResult, rateOfReturn }) {
    this.#outputView.printWinningResult({ rewardResult, rateOfReturn });
  }

  *#processGenerateLottoPhase() {
    const buyLottoPrice = yield* this.#askBuyLottoPrice();
    const { lottoCount, lottoNumbers } = this.#askGenerationLottos(buyLottoPrice);
    this.#askPrintGenerationLottoNumbers({ lottoCount, lottoNumbers });
    return { buyLottoPrice, lottoNumbers };
  }

  *#processConfirmWinningResultPhase({ buyLottoPrice, lottoNumbers }) {
    const winningLottoNumber = ascendingNumbers(yield* this.#askWinningLottoNumber());
    const bonusNumber = yield* this.#askBonusNumber(winningLottoNumber);
    const { rewardResult, rateOfReturn } = this.#askCalculationWinningResult({
      buyLottoInfo: { buyLottoPrice, lottoNumbers },
      winningInfo: { winningLottoNumber, bonusNumber },
    });
    this.#askPrintWinningResult({ rewardResult, rateOfReturn });
  }

  *#processGame() {
    const { buyLottoPrice, lottoNumbers } = yield* this.#processGenerateLottoPhase();
    yield* this.#processConfirmWinningResultPhase({ buyLottoPrice, lottoNumbers });
    Console.close();
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
