export const NUM_ROWS = 21;
export const NUM_COLS = 21;
export const HEART_EMOJI = '❤️';
// Imposta CELL_SIZE dinamicamente in base alla larghezza dello schermo
export const CELL_SIZE = window.innerWidth <= 768 || window.innerHeight <= 768 ? '4vw' : '1.7vw';

// Aggiungi un event listener per aggiornare CELL_SIZE quando la finestra viene ridimensionata
window.addEventListener('resize', () => {
    CELL_SIZE = window.innerWidth < 768 || window.innerHeight < 768 ? '4vw' : '1.7vw';
});