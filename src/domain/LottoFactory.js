const { GAME_TERMS } = require('../constants/gameTerms');
const LottoNumberMaker = require('./LottoNumberMaker');
const {
  GAME_TERMS: {
    lotto: { minValue, maxValue, count },
  },
} = require('../constants/gameTerms');
const Lotto = require('./Lotto');

class LottoFactory {
  #generateCount;

  #lottoNumberMaker;

  constructor(receivedPrice) {
    this.#generateCount = receivedPrice / GAME_TERMS.lottoPrice.unit;
    this.#lottoNumberMaker = new LottoNumberMaker({ minValue, maxValue, count });
  }

  static from(receivedPrice) {
    return new LottoFactory(receivedPrice);
  }

  #generateLottoNumber() {
    const lottoNumbers = this.#lottoNumberMaker.createLottoNumbers();
    return Lotto.fromByAscending(lottoNumbers).getLottoNumbers();
  }

  generateLottos() {
    return Array.from({ length: this.#generateCount }, () => this.#generateLottoNumber());
  }
}

module.exports = LottoFactory;
