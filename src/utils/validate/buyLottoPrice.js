const { GAME_TERMS } = require('../../constants/gameTerms');

/**
 * 입력 값이 적절한 범위의 금액인지 확인하는 메서드
 * @param {string} value - 입력 값
 * @returns {boolean} 입력 값이 적절한 범위인지의 여부에 대한 boolean
 */
const isValidRangeLottoPrice = (value) => {
  const lottoPrice = Number(value);
  return (
    lottoPrice >= GAME_TERMS.lottoPrice.minRange && lottoPrice <= GAME_TERMS.lottoPrice.maxRange
  );
};

/**
 * 입력 값이 1000원 단위로 떨어지는지 확인하는 메서드
 * @param {string} value - 입력 값
 * @returns {boolean} 입력 값이 적절한 단위 인지의 여부에 대한 boolean
 */
const isValidUnitLottoPrice = (value) => value % GAME_TERMS.lottoPrice.unit === 0;

module.exports = { isValidRangeLottoPrice, isValidUnitLottoPrice };