/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */

const { WinningResult } = require('../../src/domain');

describe('WinningResult 관련 기능 테스트', () => {
  test.each([
    {
      input: {
        buyLottoInfo: {
          buyLottoPrice: 5000,
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
      output: {
        rateOfReturn: 40631100,
        rewardResult: {
          '3개 일치 (5,000원)': 1,
          '4개 일치 (50,000원)': 1,
          '5개 일치 (1,500,000원)': 1,
          '5개 일치, 보너스 볼 일치 (30,000,000원)': 1,
          '6개 일치 (2,000,000,000원)': 1,
        },
      },
    },
    {
      input: {
        buyLottoInfo: {
          buyLottoPrice: 5000,
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
      output: {
        rateOfReturn: 1300,
        rewardResult: {
          '3개 일치 (5,000원)': 3,
          '4개 일치 (50,000원)': 1,
          '5개 일치 (1,500,000원)': 0,
          '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
          '6개 일치 (2,000,000,000원)': 0,
        },
      },
    },
  ])(
    'WinningResult를 통해 얻은 수익률은 $output.rateOfReturn%이며, 보상 결과는 $output.rewardResult이다.',
    ({ input: { buyLottoInfo, winningInfo }, output }) => {
      // given
      const winningResult = WinningResult.from({ buyLottoInfo, winningInfo });
      // when
      const { rateOfReturn, rewardResult } = winningResult.generateWinningResult();
      // then
      expect(rateOfReturn).toEqual(output.rateOfReturn);
      expect(rewardResult).toStrictEqual(output.rewardResult);
    },
  );
});
