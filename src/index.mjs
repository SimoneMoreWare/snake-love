const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const board = [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
  ];
  

const cellSize = 40; // La dimensione di ogni cella in pixel
const frameImage = new Image();
frameImage.src = '../assets/Minecraft-Heart.png'; // Percorso dell'immagine della cornice

// Disegna la matrice quando l'immagine è caricata
frameImage.onload = () => {
  drawBoard();
};

function drawBoard() {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const value = board[row][col];
      
      // Calcola la posizione x e y della cella
      const x = col * cellSize;
      const y = row * cellSize;
      
      // Disegna la cella in base al valore
      if (value === 3) {
        // Disegna l'immagine del "Minecraft Heart" per la cornice
        ctx.drawImage(frameImage, x, y, cellSize, cellSize);
      } else if (value === 0) {
        // Cella vuota (colore di sfondo)
        ctx.fillStyle = '#ffffff'; // Bianco per celle vuote
        ctx.fillRect(x, y, cellSize, cellSize);
      } else {
        // Altri valori, come lo snake o il cibo, possono essere aggiunti qui
        ctx.fillStyle = '#00ff00'; // Verde per esempio (può essere lo snake)
        ctx.fillRect(x, y, cellSize, cellSize);
      }
      
      // Aggiungi bordi per la visualizzazione della griglia
      ctx.strokeStyle = '#000000';
      ctx.strokeRect(x, y, cellSize, cellSize);
    }
  }
}
