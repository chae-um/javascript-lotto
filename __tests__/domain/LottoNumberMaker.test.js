/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */
const {
  GAME_TERMS: {
    lotto: { minValue, maxValue, count },
  },
  GAME_TERMS,
} = require('../../src/constants/gameTerms');
const { LottoNumberMaker } = require('../../src/domain');
const {
  isValidLottoNumbersRange,
  isDuplicateLottoNumbers,
} = require('../../src/utils/validate/lottoNumber');

describe('LottoNumberMaker 기능 테스트', () => {
  // given
  const lottoNumberMaker = LottoNumberMaker.from({ minValue, maxValue, count });
  test(`LottoNumberMaker가 생성한 로또는 ${GAME_TERMS.lotto.count}개의 로또 번호를 가진다.`, () => {
    // when
    const lottoNumbers = lottoNumberMaker.createLottoNumbers();
    // then
    expect(lottoNumbers.length).toEqual(GAME_TERMS.lotto.count);
  });

  test(`LottoNumberMaker가 생성한 로또는 ${GAME_TERMS.lotto.minValue} ~ ${GAME_TERMS.lotto.maxValue}의 범위를 가진다.`, () => {
    // when
    const lottoNumbers = lottoNumberMaker.createLottoNumbers();
    // then
    expect(isValidLottoNumbersRange(lottoNumbers)).toBeTruthy();
  });

  test(`LottoNumberMaker가 생성한 로또 내 로또 번호들은 중복된 값을 가지지 않는다.`, () => {
    // when
    const lottoNumbers = lottoNumberMaker.createLottoNumbers();
    // then
    expect(isDuplicateLottoNumbers(lottoNumbers)).toBeFalsy();
  });
});
