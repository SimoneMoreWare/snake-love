// Ottieni il canvas e il contesto 2D
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Definisci il tabellone con i valori
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
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
];

// Carica l'immagine del frame
const frameImage = new Image();
frameImage.src = '../assets/Minecraft-Heart.png'; // Percorso dell'immagine del frame

// Disegna il tabellone quando l'immagine è stata caricata
frameImage.onload = () => {
    drawBoard();
};

// Funzione per disegnare il tabellone
function drawBoard() {
    // Calcola la dimensione della cella separatamente per larghezza e altezza
    const cellWidth = canvas.width / 16;  // Larghezza della cella
    const cellHeight = canvas.height / 11;  // Altezza della cella

    // Cicla su ogni riga del tabellone
    for (let row = 0; row < board.length; row++) {
        // Cicla su ogni colonna della riga corrente
        for (let col = 0; col < board[row].length; col++) {
            const value = board[row][col];
            
            // Calcola la posizione (x, y) della cella
            const x = col * cellWidth;
            const y = row * cellHeight;
            
            // Disegna la cella in base al suo valore
            if (value === 3) {
                // Disegna l'immagine "Minecraft Heart" per le celle di bordo
                ctx.drawImage(frameImage, x, y, cellWidth, cellHeight);
            } else if (value === 0) {
                // Cella vuota (colore di sfondo)
                ctx.fillStyle = '#ffffff'; // Bianco per le celle vuote
                ctx.fillRect(x, y, cellWidth, cellHeight);
            } else {
                // Altri valori (come il serpente o il cibo)
                ctx.fillStyle = '#00ff00'; // Verde, per esempio (potrebbe essere il serpente)
                ctx.fillRect(x, y, cellWidth, cellHeight);
            }
            
            // Aggiungi bordi per visualizzare la griglia
            ctx.strokeStyle = '#000000'; // Bordi neri per le celle della griglia
            ctx.strokeRect(x, y, cellWidth, cellHeight);
        }
    }
}

