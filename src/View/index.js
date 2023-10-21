import Validators from '../utils/validator/index.js';
import InputView from './InputView.js';

const View = {
  async readPurchaseAmount() {
    const purchaseAmount = await InputView.readLineAsync('숫자를 입력해주세요.\n');
    Validators.checkPurchaseAmount(purchaseAmount);
    return purchaseAmount;
  },
};

export default View;
