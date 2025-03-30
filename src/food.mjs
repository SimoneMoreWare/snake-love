import { SOUND_FOOD, FOOD, NUM_ROWS, NUM_COLS } from './constants.mjs' // Importa le costanti

export class Food {
  constructor(snakeBody, wallPositions) {
    this.snakeBody = snakeBody // Corpo del serpente
    this.wallPositions = wallPositions // Posizioni dei muri
    this.position = this.generateRandomPosition() // Posizione iniziale del cibo
  }

  // Genera una posizione casuale per il cibo, evitando il serpente e i muri
  generateRandomPosition() {
    let position
    let isValid = false

    while (!isValid) {
      const x = Math.floor(Math.random() * NUM_COLS)
      const y = Math.floor(Math.random() * NUM_ROWS)
      position = { x, y }

      // Verifica che la posizione non sia occupata dal serpente o dai muri
      isValid = !this.isPositionOccupied(position)
    }

    return position
  }

  // Verifica se una posizione è occupata dal serpente o dai muri
  isPositionOccupied(position) {
    // Verifica se la posizione è nel corpo del serpente
    const isOccupiedBySnake = this.snakeBody.some(
      (segment) => segment.x === position.x && segment.y === position.y,
    )

    // Verifica se la posizione è una delle celle del muro
    const isOccupiedByWall = this.wallPositions.some(
      (wall) => wall.x === position.x && wall.y === position.y,
    )

    return isOccupiedBySnake || isOccupiedByWall
  }

  // Rimuove il cibo dalla board
  removeFromBoard() {
    const foodElement = document.querySelector('.food')
    if (foodElement) {
      foodElement.remove()

      // **Riproduce il suono quando il cibo viene rimosso**
      const sound = new Audio(SOUND_FOOD) // Percorso del file audio
      sound
        .play()
        .catch((error) =>
          console.error('Errore nella riproduzione audio:', error),
        )
    }
  }

  // Posiziona il cibo sulla board
  placeOnBoard() {
    const gameBoard = document.getElementById('game-board')
    const cells = gameBoard.querySelectorAll('.cell')
    const { x, y } = this.position

    const cellIndex = y * NUM_COLS + x
    const cell = cells[cellIndex]

    if (cell) {
      const foodElement = document.createElement('span')
      foodElement.textContent = FOOD // Emoji cibo
      foodElement.classList.add('food') // Aggiungi la classe per stilizzare il cibo
      cell.appendChild(foodElement) // Aggiungi il cibo alla cella
    }
  }

  // Rigenera una nuova posizione per il cibo
  regenerate() {
    this.position = this.generateRandomPosition()
    this.removeFromBoard()
    this.placeOnBoard()
  }

  updateRendering() {
    // Rimuovi l'elemento cibo esistente
    const existingFood = document.querySelector('.food')
    if (existingFood) {
      existingFood.remove()
    }

    // Riposiziona il cibo
    this.placeOnBoard()
  }
}
