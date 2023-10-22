import { Console } from '@woowacourse/mission-utils';

const InputView = {
  print(message) {
    Console.print(message);
  },

  async readLineAsync(message) {
    const userInput = await Console.readLineAsync(message);
    return userInput;
  },
};

export default InputView;
