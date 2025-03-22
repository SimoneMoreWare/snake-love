    import { createGameBoard } from './gameBoard.mjs';  
    import { addHeartsToBorders } from './heart.mjs';  
    import { Snake } from './snake.mjs';  
    import { Food } from './food.mjs';    
    import { NUM_ROWS, NUM_COLS, SCORE, MOVEMENT_INTERVAL, FOOD_CHECK_INTERVAL } from './constants.mjs';  
    import { JoystickController } from './joystick.mjs';  
    import { SENSIBILITY } from './constants.mjs';  

    export class Game {
        constructor() {
            this.snake = null;
            this.food = null;
            this.joystick = new JoystickController('stick', 64, 8);
            this.score = 0;
            this.intervals = [];
        }

        start() {
            this.resetBoard();
            this.initializeGame();
            this.addEventListeners();
        }

        resetBoard() {
            document.getElementById('game-board').innerHTML = ''; 
            createGameBoard();
            addHeartsToBorders();
        }

        initializeGame() {
            this.snake = new Snake(this, '👨', '👩');  // Passa l'istanza di Game

            // Posizioni dei muri
            const wallPositions = [];
            for (let i = 0; i < NUM_ROWS; i++) {
                wallPositions.push({ x: 0, y: i }); 
                wallPositions.push({ x: NUM_COLS - 1, y: i });
            }
            for (let i = 0; i < NUM_COLS; i++) {
                wallPositions.push({ x: i, y: 0 });
                wallPositions.push({ x: i, y: NUM_ROWS - 1 });
            }

            this.food = new Food(this.snake.body, wallPositions);
            this.snake.placeOnBoard();
            this.food.placeOnBoard();
            this.score = 0;
            document.getElementById('score').textContent = this.score.toString().padStart(3, '0');

            this.startGameLoop();
        }

        startGameLoop() {
            this.intervals.forEach(clearInterval); // Pulisce eventuali loop esistenti
            this.intervals = [];

            // Movimento del serpente
            this.intervals.push(setInterval(() => {
                this.updateDirectionWithJoystick();
                this.snake.move();
                if (this.snake.isGameOver) this.handleGameOver();
            }, MOVEMENT_INTERVAL));

            // Controllo cibo
            this.intervals.push(setInterval(() => {
                if (this.snake.body[0].x === this.food.position.x && this.snake.body[0].y === this.food.position.y) {
                    this.snake.body.unshift({ ...this.snake.body[0] });
                    this.food.regenerate();
                    this.score += SCORE;
                    document.getElementById('score').textContent = this.score.toString().padStart(3, '0');
                }
            }, FOOD_CHECK_INTERVAL));
        }

        addEventListeners() {
            document.addEventListener('keydown', (event) => {
                const key = event.key.toLowerCase();
                if (key === ' ') this.restartGame(); // Riavvia il gioco con la barra spaziatrice
                if (key === 'arrowup' || key === 'w') this.snake.changeDirection('UP');
                else if (key === 'arrowdown' || key === 's') this.snake.changeDirection('DOWN');
                else if (key === 'arrowleft' || key === 'a') this.snake.changeDirection('LEFT');
                else if (key === 'arrowright' || key === 'd') this.snake.changeDirection('RIGHT');
            });
        }

        updateDirectionWithJoystick() {
            if (this.joystick.value.x > SENSIBILITY) this.snake.changeDirection('RIGHT');
            else if (this.joystick.value.x < -SENSIBILITY) this.snake.changeDirection('LEFT');
            else if (this.joystick.value.y > SENSIBILITY) this.snake.changeDirection('DOWN');
            else if (this.joystick.value.y < -SENSIBILITY) this.snake.changeDirection('UP');
        }

        handleGameOver() {
            if (this.isGameOver) return;  // Evita chiamate multiple
            this.isGameOver = true;  
        
            alert('Game Over! 😢 Premi SPAZIO per riprovare.');
        
            //document.addEventListener('keydown', (event) => {
                //if (event.code === 'Space') {
                    this.restartGame();
                //}
            //}, { once: true });  // L'evento viene eseguito solo una volta
        }
        
        restartGame() {
            this.isGameOver = false;
            
            this.score = 0;  // Resetta il punteggio
            document.getElementById('score').textContent = this.score.toString().padStart(3, '0'); // Aggiorna il DOM
        
            this.snake = new Snake(this, '👨', '👩');  // Ricrea il serpente
            this.food = new Food(this.snake.body, []);  // Rigenera il cibo
        
            this.start();  // Riavvia il gioco
        }
    }
