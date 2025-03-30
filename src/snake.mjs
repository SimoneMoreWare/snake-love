import { BODY_EMOJIS, NUM_ROWS, NUM_COLS } from './constants.mjs' // Importa le costanti

export class Snake {
  constructor(game, headEmoji, bodyEmoji) {
    this.game = game // Salva il riferimento all'oggetto Game
    this.body = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
    ]
    this.headEmoji = headEmoji || '😎'
    this.bodyEmoji = bodyEmoji || '🥰'
    this.direction = 'RIGHT'
    this.isGameOver = false
  }

  clearFromBoard() {
    const snakeParts = document.querySelectorAll('.snake')
    snakeParts.forEach((part) => part.remove())
  }

  placeOnBoard() {
    if (this.isGameOver) return

    const gameBoard = document.getElementById('game-board')
    const cells = gameBoard.querySelectorAll('.cell')

    if (cells.length === 0) return

    this.body.forEach((segment, index) => {
      const { x, y } = segment
      const cellIndex = y * NUM_COLS + x
      const cell = cells[cellIndex]

      if (cell) {
        const part = document.createElement('span')
        part.textContent =
          index === 0
            ? this.headEmoji
            : index === 1
              ? this.bodyEmoji
              : getRandomBodyEmoji()
        part.classList.add('snake')
        cell.appendChild(part)
      }
    })
  }

  checkCollision(newHead) {
    const hasHitBody = this.body.some(
      (segment) => segment.x === newHead.x && segment.y === newHead.y,
    )
    const hasHitWall =
      newHead.x <= 0 ||
      newHead.x >= NUM_COLS - 1 ||
      newHead.y <= 0 ||
      newHead.y >= NUM_ROWS - 1

    if (hasHitBody || hasHitWall) {
      this.isGameOver = true
      this.game.handleGameOver() // Usa il metodo corretto di Game
      return true
    }
    return false
  }

  // Funzione per cambiare direzione
  changeDirection(newDirection) {
    // Evita che la direzione sia opposta alla direzione attuale
    if (
      (this.direction === 'RIGHT' && newDirection === 'LEFT') ||
      (this.direction === 'LEFT' && newDirection === 'RIGHT') ||
      (this.direction === 'UP' && newDirection === 'DOWN') ||
      (this.direction === 'DOWN' && newDirection === 'UP')
    ) {
      return // Non cambia direzione se è opposta
    }
    this.direction = newDirection
  }

  move() {
    if (this.isGameOver) return

    this.clearFromBoard()

    const newHead = { ...this.body[0] }

    switch (this.direction) {
      case 'UP':
        newHead.y -= 1
        break
      case 'DOWN':
        newHead.y += 1
        break
      case 'LEFT':
        newHead.x -= 1
        break
      case 'RIGHT':
        newHead.x += 1
        break
    }

    // Controlla se c'è una collisione
    if (this.checkCollision(newHead)) return // Blocca il movimento in caso di Game Over

    // Aggiungi il nuovo segmento della testa al serpente
    this.body.pop() // Rimuove l'ultimo segmento
    this.body.unshift(newHead) // Aggiungi la nuova testa in cima al corpo

    this.placeOnBoard()
  }

  updateRendering() {
    // Rimuovi tutti gli elementi del serpente dal DOM
    const existingElements = document.querySelectorAll(
      '.snake-head, .snake-body',
    )
    existingElements.forEach((element) => {
      element.remove()
    })

    // Riposiziona gli elementi del serpente
    this.placeOnBoard()
  }
}

// Funzione per pescare una emoji casuale dalla lista BODY_EMOJIS
export function getRandomBodyEmoji() {
  const randomIndex = Math.floor(Math.random() * BODY_EMOJIS.length)
  return BODY_EMOJIS[randomIndex]
}
