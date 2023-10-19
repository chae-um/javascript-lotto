const { withObjectCopy, objectSet, update } = require('../../src/utils/object');

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
        // given - when
        const result = withObjectCopy(input, callback);
        // then
        expect(result).toStrictEqual(output);
        expect(input !== output).toBeTruthy();
      },
    );
  });

  describe('objectSet 테스트', () => {
    test.each([
      {
        input: { a: 1, b: 2 },
        key: 'c',
        changeValue: 3,
        output: { a: 1, b: 2, c: 3 },
      },
      {
        input: { fruit: 'apple' },
        key: 'color',
        changeValue: 'red',
        output: { fruit: 'apple', color: 'red' },
      },
    ])(
      '입력 객체가 $input 이고, 키가 $key 이며 변경할 값이 $changeValue 일 때, 결과는 $output 이다.',
      ({ input, key, changeValue, output }) => {
        // given - when
        const result = objectSet(input, key, changeValue);
        // then
        expect(result).toStrictEqual(output);
      },
    );
  });

  describe('update 테스트', () => {
    test.each([
      {
        inputObject: { a: 1, b: 2 },
        key: 'a',
        modifyFunction: (value) => value * 2,
        output: { a: 2, b: 2 },
      },
      {
        inputObject: { name: 'Alice', age: 20 },
        key: 'age',
        modifyFunction: (prevAge) => prevAge + 1,
        output: { name: 'Alice', age: 21 },
      },
    ])(
      '입력 객체가 $inputObject 이고, 키가 $key 일 때 결과는 $output 이다.',
      ({ inputObject, key, modifyFunction, output }) => {
        // given - when
        const result = update(inputObject, key, modifyFunction);
        // then
        expect(result).toStrictEqual(output);
      },
    );
  });
});
