/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */
const { LottoFactory } = require('../../src/domain');

describe('LottoFactory 기능 테스트', () => {
  test.each([
    {
      input: {
        receivedPrice: 10000,
      },
      output: {
        size: 10,
      },
    },
    {
      input: {
        receivedPrice: 0,
      },
      output: {
        size: 0,
      },
    },
  ])(
    '받은 금액이 $input.receivedPrice원 일 때, 생성된 로또 갯수는 $output.size개 이다.',
    ({ input: { receivedPrice }, output }) => {
      // given
      const lottoFactory = LottoFactory.from(receivedPrice);
      // when
      const lottos = lottoFactory.generateLottos();
      // then
      expect(lottos.length).toEqual(output.size);
    },
  );
});
