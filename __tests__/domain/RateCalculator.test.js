/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */
const { RateCalculator } = require('../../src/domain');

describe('RateCalculator 기능 테스트', () => {
  test.each([
    {
      input: {
        buyLottoPrice: 5_000,
        winningAmount: 2_031_555_000,
      },
      output: {
        rateOfReturn: 40631100,
      },
    },
    {
      input: {
        buyLottoPrice: 5_000,
        winningAmount: 0,
      },
      output: {
        rateOfReturn: 0,
      },
    },
    {
      input: {
        buyLottoPrice: 3_000,
        winningAmount: 30_000,
      },
      output: {
        rateOfReturn: 1000,
      },
    },
  ])(
    '구매 로또 금액이 $input.buyLottoPrice원, 당첨 금액이 $input.winningAmount원 일때, 수익률은 $output.rateOfReturn%다.',
    ({ input: { buyLottoPrice, winningAmount }, output }) => {
      // given
      const rateCalculator = RateCalculator.of(winningAmount, buyLottoPrice);
      // when
      const rateOfReturn = rateCalculator.createRateOfReturn();
      // then
      expect(rateOfReturn === output.rateOfReturn).toBeTruthy();
    },
  );
});
