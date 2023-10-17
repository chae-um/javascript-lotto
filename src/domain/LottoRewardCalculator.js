const { GAME_TERMS } = require('../constants/gameTerms');
const { SYMBOLS } = require('../constants/symbols');
const { countBy } = require('../utils/array');
const { reduceFromObject, update } = require('../utils/object');

/**
 * 'rewardInfo 계산'의 역할을 수행
 */
class LottoRewardCalculator {
  /**
   * 보상 설명, 당첨 금액이 명시 된 hashTable
   * @type {Record<string, number>}
   */
  #rewardTable = GAME_TERMS.rewardInfo;

  /**
   * '보상 결과'를 나타내는 hashTable로써, 보상 설명 - 당첨 횟수를 나타냄
   * @type {Record<string, number>}
   */
  #rewardResult = this.#initRewardResult();

  /**
   * hasBonusNumber, count를 나타내는 lottoMatchInfo 객체의 배열
   * @type {object[]}
   */
  #lottoMatchInfos;

  /**
   * @param {Array} lottoMatchInfos - 로또와 당첨 번호를 비교한 정보 배열
   */
  constructor(lottoMatchInfos) {
    this.#lottoMatchInfos = lottoMatchInfos;
  }

  /**
   * LottoRewardCalculator의 정적 팩토리 메서드
   * @param {object[]} lottoMatchInfos - hasBonusNumber, count를 나타내는 lottoMatchInfo 객체의 배열
   * @returns {LottoRewardCalculator} 새 LottoRewardCalculator 인스턴스
   */
  static from(lottoMatchInfos) {
    return new LottoRewardCalculator(lottoMatchInfos);
  }

  /**
   * 초기 보상 결과 객체를 생성하는 메서드
   * {
   *  '3개 일치 (5,000원)': 0,
      '4개 일치 (50,000원)': 0,
      '5개 일치 (1,500,000원)': 0,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
      '6개 일치 (2,000,000,000원)': 0
   * }
   * @returns {Object} 초기화된 rewardResult
   */
  #initRewardResult() {
    return reduceFromObject(
      this.#rewardTable,
      (initialRewardResult, [description]) => ({
        ...initialRewardResult,
        [`${description}`]: 0,
      }),
      {},
    );
  }

  /**
   * rewardResult를 계산하는 메서드
   * @param {Object} prevRewardResult - 이전 보상 결과
   * @param {[string, number]} rewardInfo - 보상 정보 [rewardKey, count]
   * @returns {Object} update 함수를 통해 계산된 보상 결과
   */
  #calculateRewardResult(prevRewardResult, [rewardKey, count]) {
    return update(prevRewardResult, rewardKey, (prevValue) => (prevValue ?? 0) + count);
  }

  /**
   * rewardResultCount를 바탕으로 최종 보상 결과 객체를 생성하여 반환하는 메서드
   * @param {Record<string, number>} rewardResultCount - countBy를 통해 각 보상 설명에 맞는 당첨 횟수가 계산된 객체
   * @returns {Record<string, number>} 최종 RewardResult 객체
   */
  #createRewardResult(rewardResultCount) {
    return reduceFromObject(rewardResultCount, this.#calculateRewardResult.bind(this), {
      ...this.#rewardResult,
    });
  }

  /**
   * 현재까지의 당첨 금액과 새로운 당첨 금액을 합하여 반환하는 메서드
   * @param {number} prevWinningAmount - 현재까지의 당첨 금액
   * @param {Array} rewardParam - rewardResult의 key와 그에 따른 당첨 횟수를 포함하는 배열
   * @returns {number} 합산된 당첨 금액
   */
  #calculateWinningAmount(prevWinningAmount, [rewardKey, count]) {
    const winningAmount = this.#rewardTable[rewardKey] * count;
    return prevWinningAmount + winningAmount;
  }

  /**
   * 당첨 금액을 생성 후 반환하는 메서드
   * @param {Object} rewardResultCount - 보상 결과 카운트 객체
   * @returns {number} 총 당첨 금액
   */
  #createWinningAmount(rewardResultCount) {
    return reduceFromObject(rewardResultCount, this.#calculateWinningAmount.bind(this), 0);
  }

  /**
   * lottoMatchInfo로부터 rewardResult 키를 생성하는 메서드
   * @param {Object} lottoMatchInfo - 매치 정보 객체
   * @param {number} lottoMatchInfo.count - 일치하는 번호 갯수
   * @param {boolean} lottoMatchInfo.hasBonusNumber - 보너스 번호 일치 여부
   * @returns {string|null} 생성된 rewardResult 키 또는 null
   */
  #createRewardResultKey({ count, hasBonusNumber }) {
    const bonusText = hasBonusNumber && count === 5 ? ', 보너스 볼 일치' : SYMBOLS.emptyString;
    const receiveRewardDescription = `${count}개 일치${bonusText}`;
    return (
      Object.keys(this.#rewardTable).find((rewardTableKey) =>
        rewardTableKey.startsWith(receiveRewardDescription),
      ) || null
    );
  }

  /**
   * lottoMatchInfos로 부터 rewardResultKey 배열을 생성하는 메서드
   * @param {Array} lottoMatchInfos - 로또 매치 정보 배열
   * @returns {Array} 보상 결과 키 배열
   */
  #createRewardResultKeys(lottoMatchInfos) {
    return lottoMatchInfos
      .map(this.#createRewardResultKey.bind(this))
      .filter((rewardKey) => rewardKey !== null);
  }

  /**
   * 보상 결과  계산하는 메서드
   * @returns {Object} 보상 결과 카운트 객체
   */
  #calculateRewardResultCount() {
    const rewardKeys = this.#createRewardResultKeys(this.#lottoMatchInfos);
    return countBy(rewardKeys);
  }

  /**
   * rewardInfo를 계산하여 반환하는 메서드
   * @returns {Object} 당첨 정보(보상 결과, 당첨 금액)
   * @property {Record<string, number>} rewardResult - 보상 결과
   * @property {number} winningAmount - 총 당첨 금액
   */
  calculateRewardInfo() {
    const rewardResultCount = this.#calculateRewardResultCount();
    return {
      rewardResult: this.#createRewardResult(rewardResultCount),
      winningAmount: this.#createWinningAmount(rewardResultCount),
    };
  }
}

module.exports = LottoRewardCalculator;
