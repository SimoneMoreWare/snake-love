import { createGameBoard } from './gameBoard.mjs';  // Importa la funzione per creare la griglia
import { addHeartsToBorders } from './heart.mjs';  // Importa la funzione per aggiungere i cuori
import { Snake } from './snake.mjs';  // Importa la classe Snake
import { Food } from './food.mjs';    // Importa la classe Food
import { NUM_ROWS, NUM_COLS } from './constants.mjs';  // Importa le costanti

// Crea la griglia di gioco
createGameBoard();

// Aggiungi i cuori ai bordi
addHeartsToBorders();

// Crea un'istanza dello snake personalizzato
const mySnake = new Snake('👨', '👩');  // Testa = uomo, Corpo = donna

// Calcola le posizioni dei muri (le celle dei bordi)
const wallPositions = [];
for (let i = 0; i < NUM_ROWS; i++) {
  wallPositions.push({ x: 0, y: i }); // Muro sinistro
  wallPositions.push({ x: NUM_COLS - 1, y: i }); // Muro destro
}
for (let i = 0; i < NUM_COLS; i++) {
  wallPositions.push({ x: i, y: 0 }); // Muro superiore
  wallPositions.push({ x: i, y: NUM_ROWS - 1 }); // Muro inferiore
}

// Crea un'istanza del cibo
const food = new Food(mySnake.body, wallPositions);

// Posiziona lo snake inizialmente
mySnake.placeOnBoard();

// Posiziona il cibo sulla board
food.placeOnBoard();

// Event listener per controllare il movimento
document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (key === 'arrowup' || key === 'w') mySnake.direction = 'UP';
  else if (key === 'arrowdown' || key === 's') mySnake.direction = 'DOWN';
  else if (key === 'arrowleft' || key === 'a') mySnake.direction = 'LEFT';
  else if (key === 'arrowright' || key === 'd') mySnake.direction = 'RIGHT';
});

// Avvia il movimento dello snake ogni 300ms
setInterval(() => {
  mySnake.move();
}, 300);

// Gestisci l'interazione tra il serpente e il cibo
setInterval(() => {
  // Verifica se il serpente ha mangiato il cibo
  if (mySnake.body[0].x === food.position.x && mySnake.body[0].y === food.position.y) {
    mySnake.body.unshift({ ...mySnake.body[0] });  // Aggiungi un segmento al corpo
    food.regenerate();  // Rigenera il cibo
  }
}, 100);
