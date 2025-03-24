    import { createGameBoard } from './gameBoard.mjs';  
    import { addHeartsToBorders } from './heart.mjs';  
    import { Snake } from './snake.mjs';  
    import { Food } from './food.mjs';    
    import { SOUND_GAME_OVER, SOUND_LEVEL_UP_LIFE, NUM_ROWS, NUM_COLS, SCORE, MOVEMENT_INTERVAL, FOOD_CHECK_INTERVAL, SOUND_FOOD } from './constants.mjs';  
    import { JoystickController } from './joystick.mjs';  
    import { SENSIBILITY } from './constants.mjs';  
    import { Timer } from './timer.mjs';

    export class Game {
        constructor() {
            this.snake = null;
            this.food = null;
            this.joystick = new JoystickController('stick', 64, 8, 5);
            this.timer = new Timer();
            this.score = 0;
            this.intervals = [];
            this.isPaused = false;
            this.pauseOverlay = null;

            // Bind del metodo per mantenere il contesto corretto
            this.handleKeyDown = this.handleKeyDown.bind(this);
        }

        start() {
            this.resetBoard();
            this.initializeGame();
            this.createPauseOverlay();
            this.addEventListeners();
            this.timer.start();
        }
    

        createPauseOverlay() {
            // Se l'overlay già esiste, rimuovilo
            if (this.pauseOverlay) {
                this.pauseOverlay.remove();
            }
    
            this.pauseOverlay = document.createElement('div');
            this.pauseOverlay.id = 'pause-overlay';
            this.pauseOverlay.classList.add('pause-overlay');
            this.pauseOverlay.innerHTML = `
                <div class="pause-container">
                    <h2>PAUSA</h2>
                    <p>Premi 'P' per continuare</p>
                </div>
            `;
            document.body.appendChild(this.pauseOverlay);
            this.pauseOverlay.style.display = 'none';
        }

        addPauseEventListener() {
            document.addEventListener('keydown', (event) => {
                const key = event.key.toLowerCase();
                if (key === 'p') {
                    this.togglePause();
                }
            });
        }

        togglePause() {
            // Non permettere pausa se il gioco è finito
            if (this.isGameOver) return;
    
            this.isPaused = !this.isPaused;
            
            if (this.isPaused) {
                // Metti in pausa
                this.pauseOverlay.style.display = 'flex';
                this.intervals.forEach(clearInterval);
                this.timer.stop();
            } else {
                // Riprendi
                this.pauseOverlay.style.display = 'none';
                this.startGameLoop();
                this.timer.start();
            }
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
            this.intervals.forEach(clearInterval);
            this.intervals = [];
            
            // Movimento del serpente
            this.intervals.push(setInterval(() => {
                if (!this.isPaused && !this.isGameOver) {
                    this.updateDirectionWithJoystick();
                    this.snake.move();
                    if (this.snake.isGameOver){
                        this.handleGameOver();
                    }
                }
            }, MOVEMENT_INTERVAL));
    
            // Controllo cibo
            this.intervals.push(setInterval(() => {
                if (!this.isPaused && !this.isGameOver) {
                    if (this.snake.body[0].x === this.food.position.x && this.snake.body[0].y === this.food.position.y) {
                        this.snake.body.unshift({ ...this.snake.body[0] });
                        this.food.regenerate();
                        this.score += SCORE;
                        document.getElementById('score').textContent = this.score.toString().padStart(3, '0');
                    }
                }
            }, FOOD_CHECK_INTERVAL));
        }

        // Metodo centralizzato per gestire tutti i keydown
        handleKeyDown(event) {
            const key = event.key.toLowerCase();

            // Gestione pausa con priorità
            if (key === 'p') {
                // La pausa ha la massima priorità
                if (!this.isGameOver) {
                    this.togglePause();
                    return; // Esci subito per evitare altri comandi
                }
            }

            // Se il gioco è in pausa, ignora altri comandi
            if (this.isPaused || this.isGameOver) return;

            // Comandi di movimento
            if (key === 'arrowup' || key === 'w') this.snake.changeDirection('UP');
            else if (key === 'arrowdown' || key === 's') this.snake.changeDirection('DOWN');
            else if (key === 'arrowleft' || key === 'a') this.snake.changeDirection('LEFT');
            else if (key === 'arrowright' || key === 'd') this.snake.changeDirection('RIGHT');
        }

        addEventListeners() {
            // Rimuovi eventuali listener precedenti per evitare duplicazioni
            document.removeEventListener('keydown', this.handleKeyDown);
            document.addEventListener('keydown', this.handleKeyDown);
        }

        updateDirectionWithJoystick() {
            if (this.joystick.value.x > SENSIBILITY) this.snake.changeDirection('RIGHT');
            else if (this.joystick.value.x < -SENSIBILITY) this.snake.changeDirection('LEFT');
            else if (this.joystick.value.y > SENSIBILITY) this.snake.changeDirection('DOWN');
            else if (this.joystick.value.y < -SENSIBILITY) this.snake.changeDirection('UP');
        }

        handleGameOver() {
            if (this.isGameOver) return;
            this.isPaused = false; // Assicurati che la pausa sia disattivata
            this.isGameOver = true;

            this.timer.stop(); // Ferma il timer
        
            // **Riproduce il suono quando il gioco finisce**
            const sound = new Audio(SOUND_GAME_OVER);
            sound.play().catch(error => console.error("Errore nella riproduzione audio:", error));
        
            // **Aspetta la durata del suono prima di mostrare l'alert**
            sound.onended = () => {
                alert('Game Over! 😢 Premi OK per riprovare.');
                this.restartGame();
            };
        }
        
        
        restartGame() {
            // Reset completo di tutti gli stati
            this.isGameOver = false;
            this.isPaused = false;
    
            // Cancella tutti gli intervalli esistenti
            this.intervals.forEach(clearInterval);
            this.intervals = [];
    
            // Reset overlay
            if (this.pauseOverlay) {
                this.pauseOverlay.style.display = 'none';
            }
    
            this.score = 0;
            document.getElementById('score').textContent = this.score.toString().padStart(3, '0');
    
            // Ricrea completamente il gioco
            this.snake = new Snake(this, '👨', '👩');
            this.food = new Food(this.snake.body, []);
    
            this.timer.reset();
            this.start();
        }
    }
