export const ERROR_MESSAGES = {
  ERROR: '[ERROR]',
  THOUSAND: '구입 금액은 1000원 단위로 입력하셔야 합니다.',
  NUMBER: '숫자만 입력 가능합니다.',
  EMPTY: '숫자를 입력해주세요.',
  COMMA: '총 5개의 쉼표가 있어야 합니다.',
  RANGE: '로또 번호의 숫자 범위는 1~45까지 입니다.',
  DUPLICATION: '로또 번호와 중복되는 숫자는 입력하실 수 없습니다.',
  DUPLICATION_SECOND: '로또 번호는 중복되지 않아야 합니다.',
  COUNT: '로또 번호는 6개여야 합니다.',
};

export const OUTPUT_MESSAGES = {
  PURCHASE_AMOUNT: '구입금액을 입력해 주세요\n',
  PURCHASE_QUANTITY: (quantity) => `\n${quantity}개를 구매했습니다.`,
  LOTTO_NUMBER: '로또 번호를 입력해주세요\n',
};
