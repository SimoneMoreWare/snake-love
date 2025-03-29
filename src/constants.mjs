// Approccio responsive universale per Snake Game

// 1. Modifica di constants.mjs per calcolo dinamico delle dimensioni
export const NUM_ROWS = 21;
export const NUM_COLS = 21;
export const HEART_EMOJI = '❤️';
export const SCORE = 10;
export const MOVEMENT_INTERVAL = 300;
export const FOOD_CHECK_INTERVAL = 100;
export const BODY_EMOJIS = ['😀', '😉', '😋', '😎', '😍', '😘', '🥰', '🤩', '🤔', '😛', '🤤', '😲', '🤯', '😡', '🤬', '😇', '🥳', '🥺', '😈', '🤖', '💩', '🙈', '🐶', '🐔', '🐕‍🦺', '🐕', '🐖', '🐍', '🦔', '🐟', '🐓', '🐥', '👄', '💏', '👶', '👶🏻', '👩🏻‍⚕️', '👨🏻‍⚕️', '👨🏻‍🎓', '👨🏻‍💻', '🙅🏻‍♀️', '💪🏻', '🤏🏻', '🎈', '🥼', '💄', '💋', '🥇', '🧸', '🧩', '🩸', '📚', '📅', '📊', '⌚', '🚌', '🚘', '🚄', '🏠', '💧', '♍', '♏', '❌', '⛔', '🔞', '🚱', '🔰', '✅', '🔃'];
export const FOOD = '🍗';
export const SOUND_FOOD = '../assets/soundEffects/food.mp3';
export const SOUND_GAME_OVER = '../assets/soundEffects/mario_game_over_sms.mp3';
export const SOUND_LEVEL_UP_LIFE = '../assets/soundEffects/90s-game-ui-6-185099.mp3';
export const SENSIBILITY = 0.0015;

// Funzione per calcolare dinamicamente CELL_SIZE basata sullo spazio disponibile
export function calculateOptimalCellSize() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Calcola lo spazio disponibile considerando altri elementi dell'UI
  // Sottrai lo spazio per titolo, punteggio, timer e joystick (approssimativo)
  const uiHeight = viewportHeight * 0.25; // 25% dell'altezza per UI
  const availableHeight = viewportHeight - uiHeight;
  const availableWidth = viewportWidth * 0.9; // 90% della larghezza disponibile
  
  // Calcola la dimensione massima della cella per adattarsi sia in larghezza che in altezza
  const maxCellSizeByWidth = availableWidth / NUM_COLS;
  const maxCellSizeByHeight = availableHeight / NUM_ROWS;
  
  // Usa il valore più piccolo tra i due per assicurarsi che la griglia si adatti completamente
  let cellSize = Math.min(maxCellSizeByWidth, maxCellSizeByHeight);
  
  // Converti in vw per mantenere il layout responsive
  const cellSizeVw = (cellSize / viewportWidth) * 100;
  
  return cellSizeVw.toFixed(2) + 'vw';
}

// CELL_SIZE ora viene calcolato dinamicamente
export let CELL_SIZE = calculateOptimalCellSize();

// Aggiorna CELL_SIZE quando la finestra viene ridimensionata
window.addEventListener('resize', () => {
  CELL_SIZE = calculateOptimalCellSize();
  // Richiama adjustStyles per applicare le modifiche
  const event = new CustomEvent('window-resized');
  document.dispatchEvent(event);
});