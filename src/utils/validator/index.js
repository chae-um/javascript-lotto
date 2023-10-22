import Lotto from './Lotto.js';
import { checkNumber, checkDividedThousand, checkEmpty, checkComma } from './unit.js';

const Validators = {
  checkPurchaseAmount(input) {
    checkEmpty(input);
    checkNumber(input);
    checkDividedThousand(input);
  },

  checkLottoNumber(lottoNumber) {
    Lotto.validate(lottoNumber);
  },

  checkLottoNumbers(lottoNumbers) {
    checkComma(lottoNumbers);
    Lotto.validate(lottoNumbers.split(','));
  },
};

export default Validators;
