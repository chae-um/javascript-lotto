import { Console } from '@woowacourse/mission-utils';
import { GAME_MESSAGE, RESULT_MESSAGE } from '../contants/Message.js';
import { PRIZE, UNIT } from '../contants/Unit.js';

export function printLottoNumbers(lotto) {
  Console.print(`${lotto.length}${GAME_MESSAGE.boughtAmount}`);
  lotto.forEach((item) => Console.print(`[${item.join(', ')}]`));
}

export function printLottoResult(result, amount) {
  let profit = 0;

  Console.print(RESULT_MESSAGE.result);
  Object.entries(result).forEach(([prize, value]) => {
    Console.print(`${RESULT_MESSAGE[prize]}${value}${UNIT.amount}`);
    profit += PRIZE[prize] * value;
  });
  Console.print(
    `총 수익률은 ${(profit / (UNIT.lottoPrice * amount)) * 100}% 입니다.`
  );
}
