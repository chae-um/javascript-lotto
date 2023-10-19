const GAME_TERMS = Object.freeze({
  lottoPrice: Object.freeze({
    unit: 1000,
    minRange: 1000,
    maxRange: 10000,
  }),
  lotto: Object.freeze({
    minValue: 1,
    maxValue: 45,
    count: 6,
  }),
  rewardInfo: Object.freeze({
    '3개 일치 (5,000원)': 5_000,
    '4개 일치 (50,000원)': 50_000,
    '5개 일치 (1,500,000원)': 1_500_000,
    '5개 일치, 보너스 볼 일치 (30,000,000원)': 30_000_000,
    '6개 일치 (2,000,000,000원)': 2_000_000_000,
  }),
  rateOfReturn: Object.freeze({
    decimal: 1,
    percent: 100,
  }),
});

module.exports = { GAME_TERMS };
