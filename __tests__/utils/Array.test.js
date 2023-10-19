/* eslint-disable max-lines-per-function */
const { withArrayCopy, ascendingNumbers, countBy, intersection } = require('../../src/utils/array');

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
        expect(result).toStrictEqual(output);
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
      expect(result).toStrictEqual(output);
    });

    test('원래 배열을 수정해서는 안된다', () => {
      // given
      const numbers = [3, 1, 4, 1, 5];
      const originalNumbersCopy = [...numbers];
      // when
      ascendingNumbers(numbers);
      // then
      expect(numbers).toStrictEqual(originalNumbersCopy);
    });
  });

  describe('countBy 테스트', () => {
    test.each([
      {
        input: [1, 2, 3, 4, 5, 2, 3, 4],
        calculateFunction: (n) => n,
        output: { 1: 1, 2: 2, 3: 2, 4: 2, 5: 1 },
      },
      {
        input: ['apple', 'banana', 'cherry', 'apple', 'cherry'],
        output: { apple: 2, banana: 1, cherry: 2 },
      },
    ])('입력 값이 $input 일 때, 결과는 $output 이다.', ({ input, calculateFunction, output }) => {
      // given - when
      const result = countBy(input, calculateFunction ?? null);
      // then
      expect(result).toStrictEqual(output);
    });
  });

  describe('intersection 테스트', () => {
    test.each([
      {
        input: {
          firstArray: [1, 2, 3, 4],
          secondArray: [3, 4, 5, 6],
        },
        output: [3, 4],
      },
      {
        input: {
          firstArray: ['apple', 'banana', 'cherry'],
          secondArray: ['cherry', 'apple', 'grape'],
        },
        output: ['apple', 'cherry'],
      },
      {
        input: {
          firstArray: [1, 2, 3],
          secondArray: [4, 5, 6],
        },
        output: [],
      },
    ])(
      '첫 번째 배열이 $input.firstArray 이고, 두 번째 배열이 $input.firstArray 일 때, 교집합 결과는 $output 이다.',
      ({ input, output }) => {
        // given
        const { firstArray, secondArray } = input;
        // when
        const result = intersection(firstArray, secondArray);
        // then
        expect(result).toStrictEqual(output);
      },
    );
  });
});
