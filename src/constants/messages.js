const { GAME_TERMS } = require('./gameTerms');

const INPUT_MESSAGE = Object.freeze({
  buyLottoPrice: '구입금액을 입력해 주세요.\n',
});

const ERROR_MESSAGE = Object.freeze({
  common: Object.freeze({
    existEmptyValue: '값을 입력해주세요.',
    existSpaces: '입력한 값에 공백이 존재합니다.',
  }),
  buyLottoPrice: Object.freeze({
    invalidRange: `구매 가능한 로또 금액은 ${GAME_TERMS.lottoPrice.minRange}원 ~ ${GAME_TERMS.lottoPrice.maxRange}원 입니다.`,
    invalidUnit: `${GAME_TERMS.lottoPrice.unit}원 단위로 로또 구매가 가능합니다.`,
  }),
});

module.exports = { INPUT_MESSAGE, ERROR_MESSAGE };
