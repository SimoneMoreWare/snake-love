import drawBoard from './game/board.mjs';
import { loadFrameImage } from './game/frameImage.mjs';

loadFrameImage().then(() => {
    drawBoard(); // Disegna il tabellone una volta che l'immagine è stata caricata
});
// Disegna il tabellone quando l'immagine è stata caricata
frameImage.onload = () => {
    drawBoard();
};



