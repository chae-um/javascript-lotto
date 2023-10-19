/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */
const {
  GAME_TERMS: {
    lotto: { minValue, maxValue, count },
  },
} = require('../../src/constants/gameTerms');
const { Lotto, LottoNumberMaker } = require('../../src/domain');
const { isAscendingOrder } = require('../../src/utils/validate/lottoNumber');

describe('Lotto 기능 테스트', () => {
  test('생성된 로또 들은 모두 오름차순 정렬이 되어있어야 한다.', () => {
    // given
    const lottoNumberMaker = LottoNumberMaker.from({ minValue, maxValue, count });
    const lottoNumbers = lottoNumberMaker.createLottoNumbers();
    // when
    const sortedLottoNumbers = Lotto.fromByAscending(lottoNumbers).getLottoNumbers();
    sortedLottoNumbers.forEach((currentLottoNumber, index) => {
      // then
      expect(
        isAscendingOrder({ currentLottoNumber, index, lottoNumbers: sortedLottoNumbers }),
      ).toBe(true);
    });
  });
});
