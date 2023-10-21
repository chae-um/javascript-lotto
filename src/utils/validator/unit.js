import { ERROR_MESSAGES } from '../../constants/Messages.js';
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
