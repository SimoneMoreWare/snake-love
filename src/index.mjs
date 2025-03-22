import { createGameBoard } from './gameBoard.mjs';  
import { addHeartsToBorders } from './heart.mjs';  
import { Snake } from './snake.mjs';  
import { Food } from './food.mjs';    
import { NUM_ROWS, NUM_COLS, SCORE, MOVEMENT_INTERVAL, FOOD_CHECK_INTERVAL } from './constants.mjs';  
import { JoystickController } from './joystick.mjs';  // Importa il joystick
import { SENSIBILITY } from './constants.mjs';  // Importa la sensibilità

// Crea la griglia di gioco
createGameBoard();

// Aggiungi i cuori ai bordi
addHeartsToBorders();

// Crea un'istanza dello snake personalizzato
const mySnake = new Snake('👨', '👩');  

// Calcola le posizioni dei muri
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

// Variabile per il punteggio
let score = 0;

// Crea e configura il joystick
const joystick = new JoystickController('stick', 64, 8);

// Funzione per aggiornare la direzione dello Snake con il joystickfunction updateDirectionWithJoystick() {
function updateDirectionWithJoystick() {
    if (joystick.value.x > SENSIBILITY) mySnake.changeDirection('RIGHT');
    else if (joystick.value.x < -SENSIBILITY) mySnake.changeDirection('LEFT');
    else if (joystick.value.y > SENSIBILITY) mySnake.changeDirection('DOWN');
    else if (joystick.value.y < -SENSIBILITY) mySnake.changeDirection('UP');
}
      


// Event listener per il movimento con il tasto
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key === 'arrowup' || key === 'w') mySnake.changeDirection('UP');
    else if (key === 'arrowdown' || key === 's') mySnake.changeDirection('DOWN');
    else if (key === 'arrowleft' || key === 'a') mySnake.changeDirection('LEFT');
    else if (key === 'arrowright' || key === 'd') mySnake.changeDirection('RIGHT');
});

// Avvia il movimento dello snake ogni MOVEMENT_INTERVAL ms
setInterval(() => {
  updateDirectionWithJoystick();  // Usa il joystick per aggiornare la direzione
  mySnake.move();
}, MOVEMENT_INTERVAL);

// Gestisci l'interazione tra il serpente e il cibo
setInterval(() => {
  if (mySnake.body[0].x === food.position.x && mySnake.body[0].y === food.position.y) {
    mySnake.body.unshift({ ...mySnake.body[0] });
    food.regenerate();
    score += SCORE;
    document.getElementById('score').textContent = score.toString().padStart(3, '0');
  }
}, FOOD_CHECK_INTERVAL);
