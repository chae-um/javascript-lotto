import LottoGame from './controller/LottoGame.js';

const app = {
	play() {
		const lottoGame = new LottoGame();
		lottoGame.start();
	},
};

app.play();
export default app;
