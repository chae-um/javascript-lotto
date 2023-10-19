const { runGenerator } = require('../../src/utils/runGenerator');

/* eslint-disable max-lines-per-function */
describe('제너레이터 함수 테스트', () => {
  describe('runGenerator', () => {
    it('제너레이터의 각 값을 순차적으로 실행한다', (done) => {
      function* testGenerator() {
        const a = yield (callback) => setTimeout(() => callback('a'), 50);
        expect(a).toBe('a');

        const b = yield (callback) => setTimeout(() => callback('b'), 50);
        expect(b).toBe('b');

        done();
      }

      runGenerator(testGenerator);
    });

    it('제너레이터가 함수를 반환하지 않으면 해당 값을 다음 제너레이터로 전달한다', (done) => {
      function* anotherGenerator() {
        const a = yield 'a';
        expect(a).toBe('a');

        const b = yield (callback) => setTimeout(() => callback(`${a}b`), 50);
        expect(b).toBe('ab');

        done();
      }

      runGenerator(anotherGenerator);
    });
  });
});
