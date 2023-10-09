const { Console } = require('@woowacourse/mission-utils');
const { OUTPUT_MESSAGE_METHOD, OUTPUT_MESSAGE_TEXT } = require('../constants/messages');

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

  /**
   * 발행된 로또들을 출력하는 메서드
   * @param {object} printLottoInfo - 구매한 로또 번호 갯수와 로또에 대한 정보
   * @property {number} lottoCount - 로또 생성 갯수
   * @property {number[][]} lottoNumbers - 발행된 로또들의 로또 번호
   */
  printGenerationLottoNumbers({ lottoCount, lottoNumbers }) {
    this.print(OUTPUT_MESSAGE_METHOD.buyLottos(lottoCount));
    this.print(OUTPUT_MESSAGE_METHOD.lottoNumbers(lottoNumbers));
  },

  printWinningResult({ rewardResult, rateOfReturn }) {
    this.print(OUTPUT_MESSAGE_TEXT.winningStatisticsHeader);
    this.print(OUTPUT_MESSAGE_METHOD.rewardResult(rewardResult));
    this.print(OUTPUT_MESSAGE_METHOD.rateOfReturn(rateOfReturn));
  },
};

module.exports = OutputView;
