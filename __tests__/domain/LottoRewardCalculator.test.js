/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */
const { LottoRewardCalculator } = require('../../src/domain');

describe('LottoRewardCalculator 기능 테스트', () => {
  test.each([
    {
      input: {
        lottoMatchInfos: [
          { count: 3, hasBonusNumber: false },
          { count: 4, hasBonusNumber: false },
          { count: 5, hasBonusNumber: false },
          { count: 5, hasBonusNumber: true },
          { count: 6, hasBonusNumber: true },
        ],
      },
      output: {
        winningAmount: 2_031_555_000,
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
        lottoMatchInfos: [
          { count: 3, hasBonusNumber: false },
          { count: 3, hasBonusNumber: false },
          { count: 3, hasBonusNumber: false },
          { count: 4, hasBonusNumber: true },
          { count: 2, hasBonusNumber: false },
        ],
      },
      output: {
        winningAmount: 65_000,
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
    '입력 값에 대한 보상 결과는 $output.rewardResult이며. 당첨 금액은 $output.rateOfReturn%이다.',
    ({ input: { lottoMatchInfos }, output }) => {
      // given
      const lottoRewardCalculator = LottoRewardCalculator.from(lottoMatchInfos);
      // when
      const { winningAmount, rewardResult } = lottoRewardCalculator.calculateRewardInfo();
      // then
      expect(winningAmount === output.winningAmount).toBeTruthy();
      expect(rewardResult).toStrictEqual(output.rewardResult);
    },
  );
});
