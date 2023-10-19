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

  constructor(message) {
    super(`\n${AppError.#PREFIX} : ${message}\n`);
  }
}

module.exports = AppError;
