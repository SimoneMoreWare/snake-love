// src/adjustStyles.mjs aggiornato
import {
  NUM_ROWS,
  NUM_COLS,
  CELL_SIZE,
  calculateOptimalCellSize,
} from './constants.mjs'

export function adjustStyles() {
  const root = document.documentElement
  const gameBoard = document.getElementById('game-board')
  const gameBoardContainer = document.getElementById('game-board-container')
  const joystickContainer = document.getElementById('joystick-container')

  // Calcola la dimensione ottimale della cella
  const optimalCellSize = CELL_SIZE

  // Imposta le variabili CSS dinamicamente
  root.style.setProperty('--num-rows', NUM_ROWS)
  root.style.setProperty('--num-cols', NUM_COLS)
  root.style.setProperty('--cell-size', optimalCellSize)

  // Adatta il contenitore del gioco in base all'orientamento
  const isLandscape = window.innerWidth > window.innerHeight

  if (isLandscape) {
    // Layout orizzontale
    gameBoardContainer.style.flexDirection = 'row'

    // Posiziona il joystick a destra in orizzontale
    if (joystickContainer) {
      joystickContainer.style.position = 'absolute'
      joystickContainer.style.right = '5vw'
      joystickContainer.style.bottom = '20vh'
      joystickContainer.style.left = 'auto'
      joystickContainer.style.marginTop = '0'

      // Ridimensiona il joystick in base allo schermo
      const joystickSize = Math.min(128, window.innerHeight * 0.2)
      joystickContainer.style.width = `${joystickSize}px`
    }
  } else {
    // Layout verticale
    gameBoardContainer.style.flexDirection = 'column'

    // Posiziona il joystick in basso al centro in verticale
    if (joystickContainer) {
      joystickContainer.style.position = 'relative'
      joystickContainer.style.left = '0'
      joystickContainer.style.right = '0'
      joystickContainer.style.marginTop = '10px'
      joystickContainer.style.marginLeft = 'auto'
      joystickContainer.style.marginRight = 'auto'

      // Ridimensiona il joystick in base allo schermo
      const joystickSize = Math.min(128, window.innerWidth * 0.3)
      joystickContainer.style.width = `${joystickSize}px`
    }
  }

  // Adatta la dimensione del testo in base allo schermo
  const fontSize = Math.max(
    1,
    Math.min(window.innerWidth, window.innerHeight) * 0.03,
  )
  root.style.setProperty('--font-size-base', `${fontSize}px`)
}

// Ascoltatore di eventi per ridimensionamento della finestra
document.addEventListener('window-resized', adjustStyles)

// Chiamata iniziale
window.addEventListener('load', adjustStyles)
