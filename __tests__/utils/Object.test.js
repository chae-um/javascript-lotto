const { withObjectCopy } = require('../../src/utils/object');

/* eslint-disable max-lines-per-function */
describe('유틸리티 함수 테스트', () => {
  describe('withObjectCopy', () => {
    test.each([
      {
        input: { a: 1, b: 2 },
        callback: (obj) => {
          obj.c = 3;
        },
        output: { a: 1, b: 2, c: 3 },
      },
      {
        input: { name: '홍길동', age: 30 },
        callback: (obj) => {
          delete obj.age;
        },
        output: { name: '홍길동' },
      },
    ])(
      '$input일 때, callback 함수를 통해 생성된 결과는 $output이며, $input은 불변성을 유지한다.',
      ({ input, callback, output }) => {
        const result = withObjectCopy(input, callback);
        expect(result).toEqual(output);
        expect(input !== output).toBeTruthy();
      },
    );
  });
});
