const { GAME_TERMS } = require('./gameTerms');
const { SYMBOLS } = require('./symbols');

const INPUT_MESSAGE = Object.freeze({
  buyLottoPrice: '구입금액을 입력해 주세요.\n',
  winningLottoNumber: '\n당첨 번호를 입력해 주세요.\n',
  bonusNumber: '\n보너스 번호를 입력해 주세요.\n',
});

const OUTPUT_MESSAGE_METHOD = Object.freeze({
  buyLottos(lottoCount) {
    return `\n${lottoCount}개를 구매했습니다.`;
  },
  lottoNumbers(lottoNumbers) {
    return lottoNumbers
      .map((lottoNumber) => `[${lottoNumber.join(`${SYMBOLS.comma} `)}]`)
      .join(SYMBOLS.newLine);
  },
  rewardResult(rewardResult) {
    return Object.entries(rewardResult)
      .map(([key, value]) => `${key} - ${value}개`)
      .join(SYMBOLS.newLine);
  },
  rateOfReturn(rateOfReturn) {
    return `총 수익률은 ${rateOfReturn}%입니다.`;
  },
});

const OUTPUT_MESSAGE_TEXT = Object.freeze({
  winningStatisticsHeader: '\n당첨 통계\n---',
});

const ERROR_MESSAGE = Object.freeze({
  common: Object.freeze({
    existEmptyValue: '값을 입력해주세요.',
    existSpaces: '입력한 값에 공백이 존재합니다.',
    typeOfNumber: '숫자만 입력 가능합니다.',
  }),
  buyLottoPrice: Object.freeze({
    invalidRange: `구매 가능한 로또 금액은 ${GAME_TERMS.lottoPrice.minRange}원 ~ ${GAME_TERMS.lottoPrice.maxRange}원 입니다.`,
    invalidUnit: `${GAME_TERMS.lottoPrice.unit}원 단위로 로또 구매가 가능합니다.`,
  }),
  lottoNumber: Object.freeze({
    invalidRange: `당첨 번호의 범위는 ${GAME_TERMS.lotto.minValue} ~ ${GAME_TERMS.lotto.maxValue}이여야 합니다.`,
    invalidCount: `입력한 당첨 번호가 ${GAME_TERMS.lotto.count}개가 아닙니다.`,
    existDuplicateNumber: '중복된 로또 번호가 존재합니다.',
  }),
});

module.exports = { OUTPUT_MESSAGE_TEXT, INPUT_MESSAGE, ERROR_MESSAGE, OUTPUT_MESSAGE_METHOD };
