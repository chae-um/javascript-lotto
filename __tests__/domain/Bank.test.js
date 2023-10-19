/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */

const { Bank } = require('../../src/domain');

describe('Bank 관련 기능 테스트', () => {
  test.each([
    {
      input: {
        buyLottoInfo: {
          lottoNumbers: [
            [1, 22, 16, 10, 12, 11],
            [1, 22, 16, 24, 44, 12],
            [1, 22, 16, 24, 33, 12],
            [1, 22, 16, 24, 33, 5],
            [1, 22, 16, 24, 33, 26],
          ],
        },
        winningInfo: {
          winningLottoNumber: [1, 22, 16, 24, 33, 26],
          bonusNumber: 5,
        },
      },
      output: [
        { hasBonusNumber: false, count: 3 },
        { hasBonusNumber: false, count: 4 },
        { hasBonusNumber: false, count: 5 },
        { hasBonusNumber: true, count: 5 },
        { hasBonusNumber: false, count: 6 },
      ],
    },
    {
      input: {
        buyLottoInfo: {
          lottoNumbers: [
            [1, 22, 16, 10, 12, 11],
            [1, 22, 16, 21, 33, 12],
            [3, 22, 5, 24, 23, 12],
            [8, 22, 16, 10, 12, 26],
            [6, 12, 16, 24, 33, 13],
          ],
        },
        winningInfo: {
          winningLottoNumber: [1, 22, 16, 24, 33, 26],
          bonusNumber: 5,
        },
      },
      output: [
        { hasBonusNumber: false, count: 3 },
        { hasBonusNumber: false, count: 4 },
        { hasBonusNumber: true, count: 2 },
        { hasBonusNumber: false, count: 3 },
        { hasBonusNumber: false, count: 3 },
      ],
    },
  ])(
    'case %#에서 buyLottoInfo의 로또 번호들과 winningInfo의 당첨 번호 및 보너스 번호를 비교했을 때, 기대하는 결과를 반환해야 한다.',
    ({ input: { buyLottoInfo, winningInfo }, output }) => {
      // given
      const bank = Bank.from({ buyLottoInfo, winningInfo });
      // when
      const lottoMatchInfo = bank.compareLottos();
      // then
      expect(lottoMatchInfo).toStrictEqual(output);
    },
  );
});
