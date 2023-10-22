import LottoController from './controller/LottoController.js';

export default class App {
  async play() {
    new LottoController().play();
  }
}

new App().play();
