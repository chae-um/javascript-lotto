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
  /**
   * 사용자의 입력을 관리하는 View Layer
   * @private
   * @type {InputView}
   */
  #inputView = InputView;

  /**
   * 사용자에게 결과를 출력하는 View Layer
   * @private
   * @type {OutputView}
   */
  #outputView = OutputView;

  /**
   * '로또 번호 생성'을 수행하기 위한 Service Layer
   * @private
   * @type {GenerationLottoService}
   */
  #generationLottoService = GenerationLottoService;

  /**
   * '당첨 결과 계산'을 수행하기 위한 Service Layer
   * @private
   * @type {WinningResultService}
   */
  #winningResultService = WinningResultService;

  /**
   * 사용자로부터 로또 구매 금액을 입력받고 유효성을 검증 후 값을 반환하는 제너레이터 메서드
   * @private
   * @generator
   * @yields {Function} - 로또 구매 금액을 읽는 함수
   * @returns {number} - 유효성 검증된 로또 구매 금액
   */
  *#askBuyLottoPrice() {
    const inputBuyLottoPrice = yield (resolve) => this.#inputView.readBuyLottoPrice(resolve);
    BuyLottoPriceValidator.from(inputBuyLottoPrice).validateBuyLottoPrice();
    return Number(inputBuyLottoPrice);
  }

  /**
   * 사용자로부터 당첨 로또 번호를 입력받고 유효성을 검증 후 값을 반환하는 제너레이터 메서드
   * @private
   * @generator
   * @yields {Function} - 당첨 로또 번호를 읽는 함수
   * @returns {Array<number>} - 유효성 검증된 당첨 로또 번호
   */
  *#askWinningLottoNumber() {
    const inputWinningLottoNumber = yield (resolve) =>
      this.#inputView.readWinningLottoNumbers(resolve);
    LottoNumberValidator.from(inputWinningLottoNumber).validateLottoNumber();
    return inputWinningLottoNumber.split(SYMBOLS.comma).map(Number);
  }

  /**
   * 사용자로부터 보너스 번호를 입력받고 유효성을 검증 후 값을 반환하는 제너레이터 메서드
   * @private
   * @generator
   * @param {number[]} lottoNumbers - 로또 번호 리스트
   * @yields {Function} - 보너스 번호를 읽는 함수
   * @returns {number} - 유효성 검증된 보너스 번호
   */
  *#askBonusNumber(lottoNumbers) {
    const inputBonusNumber = yield (resolve) => this.#inputView.readBonusNumber(resolve);
    BonusNumberValidator.of(inputBonusNumber, lottoNumbers).validateBonusNumber();
    return Number(inputBonusNumber);
  }

  /**
   * 주어진 금액에 따라 로또 번호를 생성하는 메서드
   * @private
   * @param {number} buyLottoPrice - 로또 구매 금액
   * @returns {Array<number>} - 생성된 로또 번호 리스트
   */
  #askGenerationLottos(buyLottoPrice) {
    return this.#generationLottoService.generateLottoNumbers(buyLottoPrice);
  }

  /**
   * 당첨 결과를 계산하는 메서드
   * @private
   * @param {Object} params - 당첨 정보와 구매 로또 정보를 포함하는 객체
   * @param {Object} params.winningInfo - 당첨 로또 번호와 보너스 번호를 포함하는 객체
   * @param {Object} params.buyLottoInfo - 구매한 로또의 금액과 번호를 포함하는 객체
   * @returns {Object} - 당첨 결과 객체
   */
  #askCalculationWinningResult({ winningInfo, buyLottoInfo }) {
    return this.#winningResultService.generateWinningResult({ winningInfo, buyLottoInfo });
  }

  /**
   * 생성된 로또 번호를 출력하는 메서드
   * @private
   * @param {Object} params - 출력할 로또의 개수와 번호를 포함하는 객체
   * @param {number} params.lottoCount - 출력할 로또의 개수
   * @param {number[]} params.lottoNumbers - 출력할 로또 번호
   * @returns {void}
   */
  #askPrintGenerationLottoNumbers({ lottoCount, lottoNumbers }) {
    this.#outputView.printGenerationLottoNumbers({ lottoCount, lottoNumbers });
  }

  /**
   * 당첨 결과와 수익률을 출력하는 메서드
   * @private
   * @param {Object} params - 당첨 결과와 수익률 정보를 포함하는 객체
   * @param {Object} params.rewardResult - 당첨 결과 정보
   * @param {number} params.rateOfReturn - 수익률
   * @returns {void}
   */
  #askPrintWinningResult({ rewardResult, rateOfReturn }) {
    this.#outputView.printWinningResult({ rewardResult, rateOfReturn });
  }

  /**
   * 로또 번호 생성 단계를 수행하는 제너레이터 메서드
   * @private
   * @generator
   * @returns {Object} - 구매한 로또의 금액과 번호 정보
   */
  *#processGenerateLottoPhase() {
    const buyLottoPrice = yield* this.#askBuyLottoPrice();
    const { lottoCount, lottoNumbers } = this.#askGenerationLottos(buyLottoPrice);
    this.#askPrintGenerationLottoNumbers({ lottoCount, lottoNumbers });
    return { buyLottoPrice, lottoNumbers };
  }

  /**
   * 당첨 결과 확인 단계를 수행하는 제너레이터 메서드
   * @private
   * @generator
   * @param {Object} params - 구매한 로또의 금액과 번호 정보를 포함하는 객체
   * @param {number} params.buyLottoPrice - 구매한 로또의 금액
   * @param {number[]} params.lottoNumbers - 구매한 로또 번호
   * @returns {void}
   */
  *#processConfirmWinningResultPhase({ buyLottoPrice, lottoNumbers }) {
    const winningLottoNumber = ascendingNumbers(yield* this.#askWinningLottoNumber());
    const bonusNumber = yield* this.#askBonusNumber(winningLottoNumber);
    const { rewardResult, rateOfReturn } = this.#askCalculationWinningResult({
      buyLottoInfo: { buyLottoPrice, lottoNumbers },
      winningInfo: { winningLottoNumber, bonusNumber },
    });
    this.#askPrintWinningResult({ rewardResult, rateOfReturn });
  }

  /**
   * 게임 전체 프로세스를 수행하는 제너레이터 메서드
   * @private
   * @generator
   */
  *#processGame() {
    const { buyLottoPrice, lottoNumbers } = yield* this.#processGenerateLottoPhase();
    yield* this.#processConfirmWinningResultPhase({ buyLottoPrice, lottoNumbers });
    Console.close();
  }

  /**
   * 게임을 실행하는 제너레이터 메서드
   * @private
   * @generator
   */
  *#run() {
    yield* this.#processGame();
  }

  /**
   * 게임 실행 메서드
   * @public
   */
  play() {
    runGenerator(this.#run.bind(this));
  }
}

const app = new App();
app.play();

module.exports = App;
