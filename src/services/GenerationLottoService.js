const LottoFactory = require('../domain/LottoFactory');

const GenerationLottoService = {
  generateLottoNumbers(buyLottoPrice) {
    const lottoNumbers = LottoFactory.from(buyLottoPrice).generateLottos();
    const lottoCount = lottoNumbers.length;
    return { lottoCount, lottoNumbers };
  },
};

module.exports = GenerationLottoService;
