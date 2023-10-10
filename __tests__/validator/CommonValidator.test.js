/* eslint-disable max-lines-per-function */
const { ERROR_INSTANCES } = require('../../src/constants/errors');
const { CommonValidator } = require('../../src/validator');

describe('CommonValidator 테스트', () => {
  describe('validateExistEmptyValue', () => {
    // given - when - then
    test('빈 문자열을 입력하면 예외를 발생시킨다', () => {
      expect(() => CommonValidator.validateExistEmptyValue('')).toThrow(
        ERROR_INSTANCES.common.existEmptyValue,
      );
    });
    // given - when - then
    test('비어있지 않은 문자열을 입력하면 예외를 발생시키지 않는다', () => {
      expect(() => CommonValidator.validateExistEmptyValue('not empty')).not.toThrow();
    });
  });

  describe('validateExistSpace', () => {
    // given - when - then
    test('공백을 포함한 문자열을 입력하면 예외를 발생시킨다', () => {
      expect(() => CommonValidator.validateExistSpace('1 2')).toThrow(
        ERROR_INSTANCES.common.existSpaces,
      );
    });
    // given - when - then
    test('공백을 포함하지 않은 문자열을 입력하면 예외를 발생시키지 않는다', () => {
      expect(() => CommonValidator.validateExistSpace('noSpaces')).not.toThrow();
    });
  });

  describe('validateTypeOfNumber', () => {
    // given - when - then
    test('숫자가 아닌 문자열을 입력하면 예외를 발생시킨다', () => {
      expect(() => CommonValidator.validateTypeOfNumber('abc')).toThrow(
        ERROR_INSTANCES.common.typeOfNumber,
      );
    });
    // given - when - then
    test('숫자 문자열을 입력하면 예외를 발생시키지 않는다', () => {
      expect(() => CommonValidator.validateTypeOfNumber('123')).not.toThrow();
    });
  });

  describe('validateTypeOfNumbers', () => {
    test('숫자가 아닌 문자열이 포함된 배열을 입력하면 예외를 발생시킨다', () => {
      // given - when - then
      expect(() => CommonValidator.validateTypeOfNumbers('1,a,3')).toThrow(
        ERROR_INSTANCES.common.typeOfNumber,
      );
    });
    // given - when - then
    test('모든 값이 숫자인 배열을 입력하면 예외를 발생시키지 않는다', () => {
      expect(() => CommonValidator.validateTypeOfNumbers('1,2,3')).not.toThrow();
    });
  });
});
