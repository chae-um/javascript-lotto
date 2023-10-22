import { OUTPUT_MESSAGES } from '../constants/Messages.js';
import Validators from '../utils/validator/index.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';

const View = {
  printLotto(lottoNumbers) {
    OutputView.print(OUTPUT_MESSAGES.PURCHASE_QUANTITY(lottoNumbers.length));
    lottoNumbers.forEach((lottoNumber) => OutputView.print(lottoNumber));
  },

  async readPurchaseAmount() {
    const purchaseAmount = await InputView.readLineAsync(OUTPUT_MESSAGES.PURCHASE_AMOUNT);
    Validators.checkPurchaseAmount(purchaseAmount);
    return purchaseAmount;
  },

  async readLottoNumbers() {
    const lottoNumbers = await InputView.readLineAsync(OUTPUT_MESSAGES.LOTTO_NUMBER);
    Validators.checkLottoNumbers(lottoNumbers);
    return lottoNumbers;
  },

  async readBonusNumber(lottoNumbers) {
    const bonusNumber = await InputView.readLineAsync(OUTPUT_MESSAGES.BONUS);
    Validators.checkBonusNumber(bonusNumber, lottoNumbers);
    return bonusNumber;
  },
};

export default View;
