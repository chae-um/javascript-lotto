/* eslint-disable max-lines-per-function */
const { withArrayCopy, ascendingNumbers } = require('../../src/utils/array');

describe('Array 유틸리티 함수 테스트', () => {
  describe('withArrayCopy 테스트', () => {
    test.each([
      {
        input: [3, 1, 4, 1, 5],
        callback: (arr) => arr.push(10),
        output: [3, 1, 4, 1, 5, 10],
      },
      {
        input: [1, 2],
        callback: (arr) => arr.pop(),
        output: [1],
      },
    ])(
      'withArrayCopy 함수를 통해 생성된 배열은 $output이며, 기존 $input은 불변성을 유지한다.',
      ({ input, callback, output }) => {
        // given - when
        const result = withArrayCopy(input, callback);
        // then
        expect(result).toEqual(output);
        expect(input !== result).toBeTruthy();
      },
    );
  });

  describe('ascendingNumbers 테스트', () => {
    test.each([
      {
        input: [3, 1, 4, 1, 5, 9, 2, 6],
        output: [1, 1, 2, 3, 4, 5, 6, 9],
      },
      {
        input: [5, 4, 3, 2, 1],
        output: [1, 2, 3, 4, 5],
      },
    ])('$input일 때, 함수를 실행한 결과는 $output 이다.', ({ input, output }) => {
      // given - when
      const result = ascendingNumbers(input);
      // then
      expect(result).toEqual(output);
    });

    test('원래 배열을 수정해서는 안된다', () => {
      // given
      const numbers = [3, 1, 4, 1, 5];
      const originalNumbersCopy = [...numbers];
      // when
      ascendingNumbers(numbers);
      // then
      expect(numbers).toEqual(originalNumbersCopy);
    });
  });
});
