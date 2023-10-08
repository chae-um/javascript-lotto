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
});

module.exports = { GAME_TERMS };
