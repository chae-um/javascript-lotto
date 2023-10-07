const { Console } = require('@woowacourse/mission-utils');
const { INPUT_MESSAGE } = require('../constants/messages');

/**
 * '입력'의 역할을 수행하는 View Layer
 */
const InputView = {
  /**
   * InputView 내 여러 메서드들이 수행할 로직을 추상화 한 메서드
   * @param {string} query - 입력 값을 받을 때의 message
   * @param {function} callback - 콜백 함수
   * @returns {void}
   */
  read(query, callback) {
    Console.readLine(query, (text) => callback(text));
  },

  /**
   * 유저의 공을 입력하기 위한 메서드
   * @param {function} callback - 콜백 함수
   * @returns {void}
   */
  readBuyLottoPrice(callback) {
    this.read(INPUT_MESSAGE.buyLottoPrice, (text) => {
      callback(text);
    });
  },
};

module.exports = InputView;
