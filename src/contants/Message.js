import { GAME_OPTION } from './GameOption.js';
import { PRIZE, UNIT } from './Unit.js';

export const GAME_MESSAGE = Object.freeze({
  enterPlayerMoney: '구입금액을 입력해주세요\n',
  boughtAmount: '개를 구매했습니다.',
  enterWinningLottoNumber: '\n당첨 번호를 입력해 주세요.\n',
  enterWinningLottoBonusNumber: '\n보너스 번호를 입력해 주세요.\n',
});

export const RESULT_MESSAGE = Object.freeze({
  result: '\n당첨 통계\n---',
  fifthPrize: `3개 일치 (${PRIZE.fifthPrize.toLocaleString()}${UNIT.won}) - `,
  fourthPrize: `4개 일치 (${PRIZE.fourthPrize.toLocaleString()}${UNIT.won}) - `,
  thirdPrize: `5개 일치 (${PRIZE.thirdPrize.toLocaleString()}${UNIT.won}) - `,
  secondPrize: `5개 일치, 보너스 볼 일치 (${PRIZE.secondPrize.toLocaleString()}${
    UNIT.won
  }) - `,
  firstPrize: `6개 일치 (${PRIZE.firstPrize.toLocaleString()}${UNIT.won}) - `,
});

export const ERROR_MESSAGE = Object.freeze({
  isNotNumber: '[ERROR] 입력한 값이 숫자가 아닙니다.',
  isNotValidMoney: '[ERROR] 값은 천원 단위로 입력해야합니다.',
  isNotValidDivider: `[ERROR] 로또 번호는 쉼표 단위로 ${GAME_OPTION.pickNumber}개 입력해야 합니다.`,
  isNotValidRange: `[ERROR] 로또 번호는 ${GAME_OPTION.startNum}부터 ${GAME_OPTION.endNum} 사이의 숫자여야 합니다.`,
  isDuplicationWinningNumber: '[ERROR] 로또 번호 중 중복된 숫자가 있습니다.',
  isDuplicationWinningBonusNumber: '[ERROR] 보너스 번호가 중복된 숫자입니다.',
});
