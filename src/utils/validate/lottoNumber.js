const { GAME_TERMS } = require('../../constants/gameTerms');

/**
 * 하나의 로또 번호가 유효한 값 범위에 있는지 확인
 * @param {number} lottoNumber - 1개의 로또 번호
 * @returns {boolean} 유효한 값 범위인지의 여부에 대한 boolean
 */
const isValidLottoNumberRange = (lottoNumber) =>
  lottoNumber >= GAME_TERMS.lotto.minValue && lottoNumber <= GAME_TERMS.lotto.maxValue;

/**
 * 전체 로또 번호가 유효한 값 범위에 있는지 확인
 * @param {number[]} lottoNumbers - 로또 번호들
 * @returns {boolean} 유효한 값 범위인지의 여부에 대한 boolean
 */
const isValidLottoNumbersRange = (lottoNumbers) =>
  lottoNumbers.every((lottoNumber) => isValidLottoNumberRange(lottoNumber));

/**
 * 로또 번호의 총 갯수가 요구사항을 만족하는지 확인하는 메서드
 * @param {number[]} lottoNumbers - 로또 번호들
 * @returns {boolean} 로또 번호 총 갯수가 요구사항을 만족하는지 여부에 대한 boolean
 */
const isValidLottoCount = (lottoNumbers) => lottoNumbers.length === GAME_TERMS.lotto.count;

/**
 * 로또 번호들 중 중복되는 번호가 있는지 확인하는 메서드
 * @param {number[]} lottoNumbers - 로또 번호들
 * @returns {boolean} 로또 번호들 중 중복되는 번호의 존재 여부에 대한 boolean
 */
const isDuplicateLottoNumbers = (lottoNumbers) =>
  new Set(lottoNumbers).size !== lottoNumbers.length;

module.exports = { isDuplicateLottoNumbers, isValidLottoCount, isValidLottoNumbersRange };
