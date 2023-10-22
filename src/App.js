import LottoController from './Controller/index.js';

class App {
  #controller;

  constructor() {
    this.#controller = new LottoController();
  }

  async play() {
    await this.#controller.run();
  }
}

export default App;

const app = new App();
app.play();
