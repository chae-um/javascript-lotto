const { ERROR_INSTANCES } = require('../constants/errors');
const { isValidUnitLottoPrice, isValidRangeLottoPrice } = require('../utils/validate');
const CommonValidator = require('./CommonValidator');

class BuyLottoPriceValidator {
  #buyLottoPrice;

  #commonValidator = CommonValidator;

  constructor(buyLottoPrice) {
    this.#buyLottoPrice = buyLottoPrice;
  }

  static from(buyLottoPrice) {
    return new BuyLottoPriceValidator(buyLottoPrice);
  }

  #validateUnitBuyLottoPrice() {
    if (!isValidUnitLottoPrice(this.#buyLottoPrice))
      throw ERROR_INSTANCES.buyLottoPrice.invalidUnit;
  }

  #validateRangeOfBuyLottoPrice() {
    if (!isValidRangeLottoPrice(this.#buyLottoPrice))
      throw ERROR_INSTANCES.buyLottoPrice.invalidRange;
  }

  validateBuyLottoPrice() {
    this.#commonValidator.validateExistEmptyValue(this.#buyLottoPrice);
    this.#commonValidator.validateExistSpace(this.#buyLottoPrice);
    this.#validateRangeOfBuyLottoPrice();
    this.#validateUnitBuyLottoPrice();
  }
}

module.exports = BuyLottoPriceValidator;
