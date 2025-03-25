export const NUM_ROWS = 21;
export const NUM_COLS = 21;
export const HEART_EMOJI = '❤️';
// Imposta CELL_SIZE dinamicamente in base alla larghezza dello schermo
export let CELL_SIZE = window.innerWidth < 768 || window.innerHeight < 768 ? '1vw' : '1.3vw';
export const SCORE = 10;

/**
 * MOVEMENT_INTERVAL: intervallo in millisecondi per il movimento del serpente.
 * Imposta la velocità con cui il serpente si muove.
 * Più basso è il valore, più velocemente si muove il serpente.
 * Un valore tipico per un gioco potrebbe essere 300 ms.
 */
export const MOVEMENT_INTERVAL = 300;  // 300ms per il movimento del serpente

/**
 * FOOD_CHECK_INTERVAL: intervallo in millisecondi per verificare se il serpente ha mangiato il cibo.
 * Questo intervallo controlla periodicamente se il serpente ha mangiato il cibo.
 * Più basso è il valore, più frequentemente il gioco verificherà la collisione cibo-serpente.
 * Un valore tipico potrebbe essere 100ms.
 */
export const FOOD_CHECK_INTERVAL = 100;  // 100ms per verificare se il serpente ha mangiato il cibo
export const BODY_EMOJIS = ['😀', '😉', '😋', '😎', '😍', '😘', '🥰', '🤩', '🤔', '😛', '🤤', '😲', '🤯', '😡', '🤬', '😇', '🥳', '🥺', '😈', '🤖', '💩', '🙈', '🐶', '🐔', '🐕‍🦺', '🐕', '🐖', '🐍', '🦔', '🐟', '🐓', '🐥', '👄', '💏', '👶', '👶🏻', '👩🏻‍⚕️', '👨🏻‍⚕️', '👨🏻‍🎓', '👨🏻‍💻', '🙅🏻‍♀️', '💪🏻', '🤏🏻', '🎈', '🥼', '💄', '💋', '🥇', '🧸', '🧩', '🩸', '📚', '📅', '📊', '⌚', '🚌', '🚘', '🚄', '🏠', '💧', '♍', '♏', '❌', '⛔', '🔞', '🚱', '🔰', '✅', '🔃'];

export const FOOD = '🍗';  // Emoji cibo

export const SOUND_FOOD = '../assets/soundEffects/food.mp3';  // Percorso del file audio
export const SOUND_GAME_OVER = '../assets/soundEffects/mario_game_over_sms.mp3';  // Percorso del file audio
export const SOUND_LEVEL_UP_LIFE = '../assets/soundEffects/90s-game-ui-6-185099.mp3';  // Percorso del file audio            
export const SENSIBILITY = 0.0015;  // Sensibilità del joystick
// Aggiungi un event listener per aggiornare CELL_SIZE quando la finestra viene ridimensionata
window.addEventListener('resize', () => {
    CELL_SIZE = window.innerWidth < 768 || window.innerHeight < 768 ? '1vw' : '1.3vw';
});