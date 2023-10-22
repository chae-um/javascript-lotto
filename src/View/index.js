import { OUTPUT_MESSAGES } from '../constants/Messages.js';
import Validators from '../utils/validator/index.js';
import InputView from './InputView.js';

const View = {
  printLotto(lottoNumbers) {
    InputView.print(OUTPUT_MESSAGES.PURCHASE_QUANTITY(lottoNumbers.length));
    lottoNumbers.forEach((lottoNumber) => InputView.print(lottoNumber));
  },

  async readPurchaseAmount() {
    const purchaseAmount = await InputView.readLineAsync(OUTPUT_MESSAGES.PURCHASE_AMOUNT);
    Validators.checkPurchaseAmount(purchaseAmount);
    return purchaseAmount;
  },
  // TODO : 변수명 소문자로
  async readLottoNumbers() {
    const LottoNumbers = await InputView.readLineAsync(OUTPUT_MESSAGES.LOTTO_NUMBER);
    Validators.checkLottoNumbers(LottoNumbers);
    return LottoNumbers;
  },

  async readBonusNumber(lottoNumbers) {
    const bonusNumber = await InputView.readLineAsync(OUTPUT_MESSAGES.BONUS);
    Validators.checkBonusNumber(bonusNumber, lottoNumbers);
    return bonusNumber;
  },
};

export default View;
