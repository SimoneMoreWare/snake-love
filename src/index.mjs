import { createGameBoard } from './gameBoard.mjs';  // Importa la funzione per creare la griglia
import { addHeartsToBorders } from './heart.mjs';  // Importa la funzione per aggiungere i cuori
import { Snake } from './snake.mjs';  // Importa la classe Snake

// Crea la griglia di gioco
createGameBoard();

// Aggiungi i cuori ai bordi
addHeartsToBorders();

// Crea un'istanza dello snake personalizzato
const mySnake = new Snake('👨', '👩');  // Testa = uomo, Corpo = donna

// Posiziona lo snake inizialmente
mySnake.placeOnBoard();

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
