const { ERROR_INSTANCES } = require('../../src/constants/errors');
const { LottoNumberValidator } = require('../../src/validator');

/* eslint-disable max-lines-per-function */
describe('LottoNumberValidator 예외 테스트', () => {
  test.each([
    {
      input: {
        lottoNumbers: '',
      },
      output: {
        expectedError: ERROR_INSTANCES.common.existEmptyValue,
      },
    },
    {
      input: {
        lottoNumbers: '1,2, 3, 4,5,6',
      },
      output: {
        expectedError: ERROR_INSTANCES.common.existSpaces,
      },
    },
    {
      input: {
        lottoNumbers: 'a,b,1,2,3,4',
      },
      output: {
        expectedError: ERROR_INSTANCES.common.typeOfNumber,
      },
    },
    {
      input: {
        lottoNumbers: '0,2,3,4,5,6',
      },
      output: {
        expectedError: ERROR_INSTANCES.lottoNumber.invalidRange,
      },
    },
    {
      input: {
        lottoNumbers: '1,2,3,4,5,46',
      },
      output: {
        expectedError: ERROR_INSTANCES.lottoNumber.invalidRange,
      },
    },
    {
      input: {
        lottoNumbers: '1,2,3,3,5,6',
      },
      output: {
        expectedError: ERROR_INSTANCES.lottoNumber.existDuplicateNumber,
      },
    },
    {
      input: {
        lottoNumbers: '1,2,3,4,5',
      },
      output: {
        expectedError: ERROR_INSTANCES.lottoNumber.invalidCount,
      },
    },
    {
      input: {
        lottoNumbers: '1,2,3,4,5,6,7',
      },
      output: {
        expectedError: ERROR_INSTANCES.lottoNumber.invalidCount,
      },
    },
  ])(
    `로또 번호가 $input.lottoNumbers 일 때, $output.expectedError 에러를 던져야 한다.`,
    ({ input, output }) => {
      // given
      const lottoNumberValidator = LottoNumberValidator.from(input.lottoNumbers);
      // when - then
      expect(() => lottoNumberValidator.validateLottoNumber()).toThrow(output.expectedError);
    },
  );
});
