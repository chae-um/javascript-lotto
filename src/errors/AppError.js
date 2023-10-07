/**
 * 애플리케이션 전반에 걸쳐 사용되는 커스텀 에러 클래스
 */
class AppError extends Error {
  /**
   * 에러 메시지에 추가될 접두사
   * @static
   * @type {string}
   */
  static #PREFIX = '[ERROR]';

  /**
   * 에러 이름
   * @type {string}
   */
  name;

  constructor(message) {
    super(`\n${AppError.#PREFIX} : ${message}\n`);
    this.name = this.constructor.name;
  }
}

module.exports = AppError;
