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
};

export default View;
