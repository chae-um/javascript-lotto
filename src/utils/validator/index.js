import Lotto from './Lotto.js';
import { checkNumber, checkDividedThousand, checkEmpty } from './unit.js';

const Validators = {
  checkPurchaseAmount(input) {
    checkEmpty(input);
    checkNumber(input);
    checkDividedThousand(input);
  },

  checkLottoNumber(lottoNumber) {
    Lotto.validate(lottoNumber);
  },
};

export default Validators;
