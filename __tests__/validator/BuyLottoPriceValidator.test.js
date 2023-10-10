/* eslint-disable max-lines-per-function */
const { ERROR_INSTANCES } = require('../../src/constants/errors');
const { BuyLottoPriceValidator } = require('../../src/validator');

describe('BuyLottoPriceValidator 예외 테스트', () => {
  test.each([
    {
      input: {
        buyLottoPrice: '',
      },
      output: {
        expectedError: ERROR_INSTANCES.common.existEmptyValue,
      },
    },
    {
      input: {
        buyLottoPrice: '1 000',
      },
      output: {
        expectedError: ERROR_INSTANCES.common.existSpaces,
      },
    },
    {
      input: {
        buyLottoPrice: 'a1000',
      },
      output: {
        expectedError: ERROR_INSTANCES.common.typeOfNumber,
      },
    },
    {
      input: {
        buyLottoPrice: '500',
      },
      output: {
        expectedError: ERROR_INSTANCES.buyLottoPrice.invalidRange,
      },
    },
    {
      input: {
        buyLottoPrice: '150000',
      },
      output: {
        expectedError: ERROR_INSTANCES.buyLottoPrice.invalidRange,
      },
    },
    {
      input: {
        buyLottoPrice: '2500',
      },
      output: {
        expectedError: ERROR_INSTANCES.buyLottoPrice.invalidUnit,
      },
    },
  ])(
    `로또 구매 가격이 $input.buyLottoPrice 일 때, $output.expectedError 에러를 던져야 한다.`,
    ({ input, output }) => {
      // given
      const buyLottoPriceValidator = BuyLottoPriceValidator.from(input.buyLottoPrice);
      // when - then
      expect(() => buyLottoPriceValidator.validateBuyLottoPrice()).toThrow(output.expectedError);
    },
  );
});
