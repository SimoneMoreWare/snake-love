// src/adjustStyles.mjs
import { NUM_ROWS, NUM_COLS, CELL_SIZE } from './constants.mjs';

export function adjustStyles() {
  const gameBoard = document.getElementById('game-board');

  // Imposta le variabili CSS dinamicamente
  gameBoard.style.setProperty('--num-rows', NUM_ROWS);
  gameBoard.style.setProperty('--num-cols', NUM_COLS);
  gameBoard.style.setProperty('--cell-size', CELL_SIZE);
}
