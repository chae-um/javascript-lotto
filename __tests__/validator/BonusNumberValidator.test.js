/* eslint-disable max-lines-per-function */
const { ERROR_INSTANCES } = require('../../src/constants/errors');
const { BonusNumberValidator } = require('../../src/validator');

describe('BonusNumberValidator 예외 테스트', () => {
  test.each([
    {
      input: {
        bonusNumber: '',
        lottoNumbers: [1, 2, 3, 4, 5, 6],
      },
      output: {
        expectedError: ERROR_INSTANCES.common.existEmptyValue,
      },
    },
    {
      input: {
        bonusNumber: ' 7',
        lottoNumbers: [1, 2, 3, 4, 5, 6],
      },
      output: {
        expectedError: ERROR_INSTANCES.common.existSpaces,
      },
    },
    {
      input: {
        bonusNumber: 'a',
        lottoNumbers: [1, 2, 3, 4, 5, 6],
      },
      output: {
        expectedError: ERROR_INSTANCES.common.typeOfNumber,
      },
    },
    {
      input: {
        bonusNumber: '0',
        lottoNumbers: [1, 2, 3, 4, 5, 6],
      },
      output: {
        expectedError: ERROR_INSTANCES.lottoNumber.invalidRange,
      },
    },
    {
      input: {
        bonusNumber: '46',
        lottoNumbers: [1, 2, 3, 4, 5, 6],
      },
      output: {
        expectedError: ERROR_INSTANCES.lottoNumber.invalidRange,
      },
    },
    {
      input: {
        bonusNumber: '7',
        lottoNumbers: [1, 2, 3, 4, 5, 6, 7],
      },
      output: {
        expectedError: ERROR_INSTANCES.lottoNumber.existDuplicateNumber,
      },
    },
  ])(
    `보너스 번호가 $input.bonusNumber 이고, 로또 번호가 $input.lottoNumbers 일 때, $output.expectedError 에러를 던져야 한다.`,
    ({ input, output }) => {
      // given
      const bonusNumberValidator = BonusNumberValidator.of(input.bonusNumber, input.lottoNumbers);
      // when - then
      expect(() => bonusNumberValidator.validateBonusNumber()).toThrow(output.expectedError);
    },
  );
});
