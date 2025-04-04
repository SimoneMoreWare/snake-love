// src/gameBoard.mjs
import { NUM_ROWS, NUM_COLS, CELL_SIZE } from './constants.mjs'

export function createGameBoard() {
  const gameBoard = document.getElementById('game-board')

  // Imposta il layout della griglia
  gameBoard.style.display = 'grid'
  gameBoard.style.gridTemplateColumns = `repeat(${NUM_COLS}, ${CELL_SIZE})`
  gameBoard.style.gridTemplateRows = `repeat(${NUM_ROWS}, ${CELL_SIZE})`

  // Crea le celle e aggiungile al contenitore
  for (let i = 0; i < NUM_ROWS * NUM_COLS; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell') // Aggiungi una classe alle celle
    gameBoard.appendChild(cell)
  }
}
