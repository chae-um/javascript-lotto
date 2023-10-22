import { ERROR_MESSAGES } from '../../constants/Messages.js';
import { CORE_SYSTEM } from '../../constants/System.js';
import ValidationError from '../error/ValidationError.js';

export const checkNumber = (purchaseAmount) => {
  if (Number.isNaN(Number(purchaseAmount))) {
    throw new ValidationError(ERROR_MESSAGES.NUMBER);
  }
};

export const checkDividedThousand = (purchaseAmount) => {
  if (purchaseAmount % 1000 !== 0) {
    throw new ValidationError(ERROR_MESSAGES.THOUSAND);
  }
};

export const checkEmpty = (purchaseAmount) => {
  if (purchaseAmount === '') {
    throw new ValidationError(ERROR_MESSAGES.EMPTY);
  }
};

export const checkComma = (lottoNumbers) => {
  const matches = lottoNumbers.match(/,/g);
  if (matches.length !== CORE_SYSTEM.LOTTO_COUNT - 1) {
    throw new ValidationError(ERROR_MESSAGES.COMMA);
  }
};

export const checkWithinRange = (bouseNumber) => {
  if (bouseNumber < CORE_SYSTEM.START_NUM || bouseNumber > CORE_SYSTEM.END_NUM) {
    throw new ValidationError(ERROR_MESSAGES.RANGE);
  }
};

export const checkDuplication = (bouseNumber, lottoNumbers) => {
  if (lottoNumbers.includes(bouseNumber)) {
    throw new ValidationError(ERROR_MESSAGES.DUPLICATION);
  }
};
