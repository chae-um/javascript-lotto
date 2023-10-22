import { Random } from '@woowacourse/mission-utils';
import Validators from './validator/index.js';
import CORE_SYSTEM from '../constants/System.js';

const LottoNumberGenerator = {
  run(count) {
    const lottoNumbers = [];

    while (lottoNumbers.length < count) {
      const { LOTTO_COUNT, START_NUM, END_NUM } = CORE_SYSTEM;
      const lottoNumber = Random.pickUniqueNumbersInRange(START_NUM, END_NUM, LOTTO_COUNT);
      Validators.checkLottoNumber(lottoNumber);
      lottoNumbers.push(lottoNumber);
    }

    return lottoNumbers;
  },
};

export default LottoNumberGenerator;
