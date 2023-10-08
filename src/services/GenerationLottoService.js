const { SYMBOLS } = require('../constants/symbols');
const LottoFactory = require('../domain/LottoFactory');

const GenerationLottoService = {
  generateLottoNumbers(buyLottoPrice) {
    const lottoNumbers = LottoFactory.from(buyLottoPrice).generateLottos();
    return lottoNumbers
      .map((lottoNumber) => `[${lottoNumber.join(`${SYMBOLS.comma} `)}]`)
      .join(SYMBOLS.newLine);
  },
};

module.exports = GenerationLottoService;
