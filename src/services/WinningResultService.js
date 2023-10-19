const WinningResult = require('../domain/WinningResult');

const WinningResultService = {
  generateWinningResult({ buyLottoInfo, winningInfo }) {
    return WinningResult.from({ buyLottoInfo, winningInfo }).generateWinningResult();
  },
};

module.exports = WinningResultService;
