import { createGameBoard } from './gameBoard.mjs';  
import { addHeartsToBorders } from './heart.mjs';  
import { Snake } from './snake.mjs';  
import { Food } from './food.mjs';    
import { SOUND_GAME_OVER, SOUND_LEVEL_UP_LIFE, NUM_ROWS, NUM_COLS, SCORE, MOVEMENT_INTERVAL, FOOD_CHECK_INTERVAL, SOUND_FOOD, POINTS_PER_LIFE} from './constants.mjs';  
import { JoystickController } from './joystick.mjs';  
import { SENSIBILITY } from './constants.mjs';  
import { Timer } from './timer.mjs';
import { adjustStyles } from './adjustStyles.mjs';
import { setupFullscreenAndOrientation } from './fullscreen.mjs';

export class Game {
    constructor() {
        this.snake = null;
        this.food = null;
        this.joystick = new JoystickController('stick', 64, 8, 1);
        this.timer = new Timer();
        this.score = 0;
        this.intervals = [];
        this.isPaused = false;
        this.pauseOverlay = null;
        this.startOverlay = null;
        this.isGameReady = false;
        // Bind del metodo per mantenere il contesto corretto
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleScreenResize = this.handleScreenResize.bind(this);
    }

    start() {
        // Applica le ottimizzazioni responsive
        this.setupResponsiveLayout();
        
        this.resetBoard();
        this.createStartOverlay();
        this.createPauseOverlay();
        this.addEventListeners();
        this.addStartListener();
    }
    
    // Nuovo metodo per gestire la responsività
    setupResponsiveLayout() {
        // Applica gli stili responsive
        adjustStyles();
        
        // Configura fullscreen e orientamento
        setupFullscreenAndOrientation();
        
        // Aggiungi ascoltatore per il ridimensionamento
        window.addEventListener('resize', this.handleScreenResize);
        document.addEventListener('window-resized', this.handleScreenResize);
    }
    
    // Gestore per ridimensionamento schermo
    handleScreenResize() {
        // Ricalcola il layout e aggiorna la griglia
        adjustStyles();
        
        // Se il gioco è già iniziato, riposiziona elementi
        if (this.snake && this.food) {
            this.snake.updateRendering();
            this.food.updateRendering();
        }
        
        // Aggiusta posizione joystick
        if (this.joystick) {
            this.joystick.updateBasePosition();
        }
    }

    createStartOverlay() {
        // Rimuovi eventuali overlay esistenti
        if (this.startOverlay) {
            this.startOverlay.remove();
        }

        this.startOverlay = document.createElement('div');
        this.startOverlay.id = 'start-overlay';
        this.startOverlay.classList.add('start-overlay');
        this.startOverlay.innerHTML = `
            <div class="start-container">
                <h2>Snake Love <3</h2>
                <p>Premi un qualsiasi tasto per iniziare!</p>
                <div class="start-instructions">
                    <p>Comandi:</p>
                    <ul>
                        <li>🏹 Frecce direzionali o WASD per muoverti</li>
                        <li>P per mettere in pausa</li>
                        <li>📱 Fullscreen per modalità schermo intero</li>
                    </ul>
                </div>
            </div>
        `;
        document.body.appendChild(this.startOverlay);
    }

    createPauseOverlay() {
        // Se l'overlay già esiste, rimuovilo
        if (this.pauseOverlay) {
            this.pauseOverlay.remove();
        }
        this.pauseOverlay = document.createElement('div');
        this.pauseOverlay.id = 'pause-overlay';
        this.pauseOverlay.classList.add('pause-overlay');
        this.pauseOverlay.innerHTML = 
            `<div class="pause-container">
                <h2>PAUSA</h2>
                <p>Premi 'P' per continuare</p>
            </div>
        `;
        document.body.appendChild(this.pauseOverlay);
        this.pauseOverlay.style.display = 'none';
    }

    addStartListener() {
        const startHandler = () => {
            if (!this.isGameReady) {
                this.isGameReady = true;
                this.startOverlay.style.display = 'none';
                this.initializeGame();
                this.timer.start();
    
                // Rimuove i listener dopo l'inizio del gioco
                document.removeEventListener('keydown', startHandler);
                document.removeEventListener('touchstart', startHandler);
            }
        };
    
        document.addEventListener('keydown', startHandler);
        document.addEventListener('touchstart', startHandler); // Aggiunto supporto touch
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
        // Sposta qui l'inizializzazione del gioco che era nel metodo start()
        this.snake = new Snake(this, '👨', '👩');
        
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
                    
                    // Riproduci suono
                    if (this.score % POINTS_PER_LIFE !== 0) {
                        const foodSound = new Audio(SOUND_FOOD);
                        foodSound.play().catch(error => console.error("Errore nella riproduzione audio:", error));
                    } else {
                        // Riproduci suono di livello superiore
                        const levelUpSound = new Audio(SOUND_LEVEL_UP_LIFE);
                        levelUpSound.play().catch(error => console.error("Errore nella riproduzione audio:", error));
                    }
                    
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
        
        // Aggiungi gestione orientamento
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleScreenResize();
            }, 200);
        });
    }

    updateDirectionWithJoystick() {
        if (Math.abs(this.joystick.value.x) > Math.abs(this.joystick.value.y)) {
            if (this.joystick.value.x > SENSIBILITY) this.snake.changeDirection('RIGHT');
            else if (this.joystick.value.x < -SENSIBILITY) this.snake.changeDirection('LEFT');
        } else {
            if (this.joystick.value.y > SENSIBILITY) this.snake.changeDirection('DOWN');
            else if (this.joystick.value.y < -SENSIBILITY) this.snake.changeDirection('UP');
        }
    }

    handleGameOver() {
        if (this.isGameOver) return;
        this.isPaused = false; // Assicurati che la pausa sia disattivata
        this.isGameOver = true;
    
        this.timer.stop(); // Ferma il timer
    
        // Riproduce il suono quando il gioco finisce
        const sound = new Audio(SOUND_GAME_OVER);
        sound.play().catch(error => console.error("Errore nella riproduzione audio:", error));
    
        // Mostra la modal dopo che il suono è finito
        sound.onended = () => {
            const modal = document.getElementById('game-over-modal');
            const restartButton = document.getElementById('restart-button');
    
            // Mostra la modal
            modal.style.display = 'flex';
    
            // Gestisci il click sul pulsante per riavviare il gioco
            const restartClickHandler = () => {
                this.restartGame();
                modal.style.display = 'none'; // Nascondi la modal
                restartButton.removeEventListener('click', restartClickHandler);
            };
            
            restartButton.addEventListener('click', restartClickHandler);
        };
    }
    
    restartGame() {
        // Modifiche al metodo esistente
        this.isGameOver = false;
        this.isPaused = false;
        this.isGameReady = false;

        // Cancella tutti gli intervalli esistenti
        this.intervals.forEach(clearInterval);
        this.intervals = [];

        // Reset overlay
        if (this.pauseOverlay) {
            this.pauseOverlay.style.display = 'none';
        }

        this.score = 0;
        document.getElementById('score').textContent = this.score.toString().padStart(3, '0');

        // Torna alla schermata iniziale
        this.start();
    }
    
    // Aggiungi metodo di pulizia per quando il gioco viene distrutto
    cleanup() {
        // Rimuovi tutti gli event listener
        window.removeEventListener('resize', this.handleScreenResize);
        document.removeEventListener('window-resized', this.handleScreenResize);
        document.removeEventListener('keydown', this.handleKeyDown);
        
        // Pulisci gli interval
        this.intervals.forEach(clearInterval);
        this.intervals = [];
    }
}