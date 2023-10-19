const { GAME_TERMS } = require('../constants/gameTerms');
const LottoNumberMaker = require('./LottoNumberMaker');
const {
  GAME_TERMS: {
    lotto: { minValue, maxValue, count },
  },
} = require('../constants/gameTerms');
const Lotto = require('./Lotto');

/**
 * '구매 가격 만큼의 로또 생성' 역할을 수행
 */
class LottoFactory {
  /**
   * 로또 생성 횟수
   * @type {number}
   */
  #generateCount;

  /**
   * LottoNumberMaker 인스턴스
   * @type {LottoNumberMaker}
   */
  #lottoNumberMaker;

  /**
   * LottoFactory 인스턴스를 생성
   *
   * @param {number} receivedPrice - 로또 구매 금액
   */
  constructor(receivedPrice) {
    this.#generateCount = receivedPrice / GAME_TERMS.lottoPrice.unit;
    this.#lottoNumberMaker = new LottoNumberMaker({ minValue, maxValue, count });
  }

  /**
   * 로또 구매 금액을 기반으로 새로운 LottoFactory 인스턴스를 생성하는 팩토리 메서드
   *
   * @param {number} receivedPrice - 로또 구매 금액
   * @returns {LottoFactory} 새로운 LottoFactory 인스턴스를 반환
   */
  static from(receivedPrice) {
    return new LottoFactory(receivedPrice);
  }

  /**
   * 로또 번호를 생성하는 메서드
   *
   * @returns {number[]} 생성된 로또 번호를 반환
   */
  #generateLottoNumber() {
    const lottoNumbers = this.#lottoNumberMaker.createLottoNumbers();
    return Lotto.fromByAscending(lottoNumbers).getLottoNumbers();
  }

  /**
   * 주어진 금액에 따른 로또 번호들을 생성하는 메서드
   *
   * @returns {number[][]} 생성된 로또 번호들의 배열을 반환
   */
  generateLottos() {
    return Array.from({ length: this.#generateCount }, () => this.#generateLottoNumber());
  }
}

module.exports = LottoFactory;
