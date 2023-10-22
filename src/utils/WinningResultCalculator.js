import { REWARD } from '../constants/System.js';

const WinningResultCalculator = {
  getRateOfReturn(winningResult, purchaseAmount) {
    let sum = 0;

    Object.entries(winningResult).forEach(([key, value]) => {
      sum += REWARD[key.toUpperCase()] * +value;
    });

    return ((sum / purchaseAmount) * 100).toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  },
};

export default WinningResultCalculator;
