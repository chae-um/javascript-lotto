import { Console } from '@woowacourse/mission-utils';
import { GAME_MESSAGE } from '../contants/Message.js';
import {
  checkLottoBonusNumber,
  checkLottoNumbers,
  checkMoneyInput,
} from '../utils/Validation.js';

export async function readPlayerMoneyInput() {
  const res = await Console.readLineAsync(GAME_MESSAGE.enterPlayerMoney);
  checkMoneyInput(res);
  return res;
}

export async function readWinningLottoNumberInput() {
  const res = await Console.readLineAsync(GAME_MESSAGE.enterWinningLottoNumber);
  checkLottoNumbers(res);
  return res;
}

export async function readWinningLottoBonusNumberInput(winningNumbers) {
  const res = await Console.readLineAsync(
    GAME_MESSAGE.enterWinningLottoBonusNumber
  );
  checkLottoBonusNumber(res, winningNumbers);
  return res;
}
