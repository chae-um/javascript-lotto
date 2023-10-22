import { GAME_OPTION } from '../contants/GameOption.js';
import { ERROR_MESSAGE } from '../contants/Message.js';
import { UNIT } from '../contants/Unit.js';

export function checkMoneyInput(input) {
  isNumber(input);
  isValidNumber(input);
}

export function checkLottoNumbers(input) {
  isValidDivider(input);
  isValidLottoNumbers(input);
  isLottoNumbersDuplication(input);
}

export function checkLottoBonusNumber(input, winningNumbers) {
  isValidLottoBonusNumber(input);
  isLottoBonusNumberDuplication(input, winningNumbers);
}

function isNumber(input) {
  const check = Number(input);

  if (Number.isNaN(check)) {
    throw new Error(ERROR_MESSAGE.isNotNumber);
  }
}

function isValidNumber(input) {
  const value = Number(input);

  if (value % UNIT.lottoPrice !== 0) {
    throw new Error(ERROR_MESSAGE.isNotValidMoney);
  }
}

function isValidDivider(input) {
  if (input.split(UNIT.divider).length !== GAME_OPTION.pickNumber) {
    throw new Error(ERROR_MESSAGE.isNotValidDivider);
  }
}

function isValidLottoNumbers(input) {
  const lottoNumbers = input.split(UNIT.divider).map(Number);

  lottoNumbers.forEach((number) => {
    if (Number.isNaN(number)) {
      throw new Error(ERROR_MESSAGE.isNotNumber);
    }
    if (number < GAME_OPTION.startNum || number > GAME_OPTION.endNum) {
      throw new Error(ERROR_MESSAGE.isNotValidRange);
    }
  });
}

function isLottoNumbersDuplication(input) {
  const lottoNumbers = new Set(input.split(UNIT.divider).map(Number));

  if (lottoNumbers.size !== GAME_OPTION.pickNumber) {
    throw new Error(ERROR_MESSAGE.isDuplicationWinningNumber);
  }
}

function isValidLottoBonusNumber(input) {
  const lottoBonusNumber = Number(input);

  if (Number.isNaN(lottoBonusNumber)) {
    throw new Error(ERROR_MESSAGE.isNotNumber);
  }
  if (
    lottoBonusNumber < GAME_OPTION.startNum ||
    lottoBonusNumber > GAME_OPTION.endNum
  ) {
    throw new Error(ERROR_MESSAGE.isNotValidRange);
  }
}

function isLottoBonusNumberDuplication(input, winningNumbers) {
  if (winningNumbers.includes(Number(input))) {
    throw new Error(ERROR_MESSAGE.isDuplicationWinningBonusNumber);
  }
}
