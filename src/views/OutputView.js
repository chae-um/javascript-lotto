const { Console } = require('@woowacourse/mission-utils');
const { OUTPUT_MESSAGE } = require('../constants/messages');

/**
 * '출력'의 역할을 수행하는 View Layer
 */
const OutputView = {
  /**
   * 메시지를 출력하는 메서드
   * @param {string} message - 출력할 메시지
   */
  print(message) {
    Console.print(message);
  },

  /**
   * '게임 시작' 메시지를 출력하는 메서드
   */
  printError(message) {
    this.print(message);
  },
};

module.exports = OutputView;
