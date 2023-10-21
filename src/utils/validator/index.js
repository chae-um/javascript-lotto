import { checkNumber, checkDividedThousand, checkEmpty } from './unit.js';

const Validators = {
  checkPurchaseAmount(input) {
    checkEmpty(input);
    checkNumber(input);
    checkDividedThousand(input);
  },
};

export default Validators;
