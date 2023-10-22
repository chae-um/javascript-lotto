import Lotto from '../Lotto.js';
import { UNIT } from '../contants/Unit.js';
import Computer from '../model/Computer.js';
import {
  readPlayerMoneyInput,
  readWinningLottoBonusNumberInput,
  readWinningLottoNumberInput,
} from '../view/InputView.js';
import { printLottoNumbers, printLottoResult } from '../view/OutputView.js';

export default class LottoController {
  #lotto;

  #computer;

  async play() {
    const money = await readPlayerMoneyInput();
    this.#lotto = new Lotto(Number(money) / UNIT.lottoPrice);
    this.#printGeneratedLottoNumbers();
  }

  async #printGeneratedLottoNumbers() {
    const lottoNumbers = this.#lotto.getNumbers();
    printLottoNumbers(lottoNumbers);
    await this.#getWinLottoNumbers();
  }

  async #getWinLottoNumbers() {
    const winningNumbers = await readWinningLottoNumberInput();
    const winningBonusNumber =
      await readWinningLottoBonusNumberInput(winningNumbers);

    this.#computer = new Computer();
    this.#computer.setWinningNumbers(
      winningNumbers.split(',').map(Number),
      Number(winningBonusNumber)
    );
    this.#printLottoResult();
  }

  async #printLottoResult() {
    const lottoNumbers = this.#lotto.getNumbers();
    const result = this.#computer.compare(lottoNumbers);
    printLottoResult(result, lottoNumbers.length);
  }
}
