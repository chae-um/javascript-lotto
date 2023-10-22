import { ERROR_MESSAGE } from '../contants/Message.js';

function isNumber(input) {
  const check = Number(input);

  if (Number.isNaN(check)) {
    throw new Error(ERROR_MESSAGE.isNotNumber);
  }
}

function isValidNumber(input) {
  const value = Number(input);

  if (value % 1000 !== 0) {
    throw new Error(ERROR_MESSAGE.isNotValidMoney);
  }
}

export function checkMoneyInput(input) {
  isNumber(input);
  isValidNumber(input);
}

function isValidDivider(input) {
  if (input.split(',').length !== 6) {
    throw new Error(ERROR_MESSAGE.isNotValidDivider);
  }
}

function isValidLottoNumbers(input) {
  const lottoNumbers = input.split(',').map(Number);

  lottoNumbers.forEach((number) => {
    if (Number.isNaN(number)) {
      throw new Error(ERROR_MESSAGE.isNotNumber);
    }
    if (number < 1 || number > 45) {
      throw new Error(ERROR_MESSAGE.isNotValidRange);
    }
  });
}

function isLottoNumbersDuplication(input) {
  const lottoNumbers = new Set(input.split(',').map(Number));

  if (lottoNumbers.size !== 6) {
    throw new Error(ERROR_MESSAGE.isDuplicationWinningNumber);
  }
}

export function checkLottoNumbers(input) {
  isValidDivider(input);
  isValidLottoNumbers(input);
  isLottoNumbersDuplication(input);
}

function isValidLottoBonusNumber(input) {
  const lottoBonusNumber = Number(input);

  if (Number.isNaN(lottoBonusNumber)) {
    throw new Error(ERROR_MESSAGE.isNotNumber);
  }
  if (lottoBonusNumber < 1 || lottoBonusNumber > 45) {
    throw new Error(ERROR_MESSAGE.isNotValidRange);
  }
}

function isLottoBonusNumberDuplication(input, winningNumbers) {
  if (winningNumbers.includes(Number(input))) {
    throw new Error(ERROR_MESSAGE.isDuplicationWinningBonusNumber);
  }
}

export function checkLottoBonusNumber(input, winningNumbers) {
  isValidLottoBonusNumber(input);
  isLottoBonusNumberDuplication(input, winningNumbers);
}
