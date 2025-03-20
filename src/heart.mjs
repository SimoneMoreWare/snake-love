import { NUM_ROWS, NUM_COLS } from './constants.mjs';  // Importa le costanti

export function addHeartsToBorders() {
  const gameBoard = document.getElementById('game-board');
  const cells = gameBoard.querySelectorAll('.cell');  // Seleziona tutte le celle

  // Aggiungi cuoricini ai bordi
  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLS; j++) {
      const index = i * NUM_COLS + j;
      const cell = cells[index];

      // Aggiungi cuoricini solo alle celle dei bordi
      if (i === 0 || i === NUM_ROWS - 1 || j === 0 || j === NUM_COLS - 1) {
        const heart = document.createElement('span');
        heart.textContent = '❤️';  // Emoji cuore
        heart.classList.add('heart');  // Aggiungi la classe per stilizzare il cuore
        cell.appendChild(heart);  // Aggiungi il cuore alla cella
      }
    }
  }
}
