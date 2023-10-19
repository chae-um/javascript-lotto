/**
 * 입력된 값이 함수인지 판단하는 메서드
 * @param {any} thing - 검사할 객체
 * @returns {boolean} 객체가 함수인지의 여부에 대한 boolean
 */
const isTask = (thing) => typeof thing === 'function';

/**
 * 제너레이터를 실행하면서 이전 제너레이터 결과를 전달하는 메서드
 * @param {Generator} gen - 실행할 제너레이터 객체
 * @param {IteratorResult} prevGenResult - 이전 제너레이터 실행 결과
 */
const whileGenerates = (gen, prevGenResult) => {
  if (isTask(prevGenResult.value)) {
    const task = prevGenResult.value;
    const resolve = (...args) => whileGenerates(gen, gen.next(...args));
    task(resolve); // run callback
  } else if (!prevGenResult.done) {
    whileGenerates(gen, gen.next(prevGenResult.value));
  }
};

/**
 * 주어진 제너레이터 함수를 실행하는 메서드
 * @param {function} generator - 실행할 제너레이터 함수
 */
const runGenerator = (generator) => {
  const gen = generator();
  whileGenerates(gen, gen.next());
};

module.exports = { runGenerator };
