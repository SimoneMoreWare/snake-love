// Get the canvas element and its 2D context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the game board with values
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
  

const cellSize = 40; // Define the size of each cell in pixels
const frameImage = new Image();
frameImage.src = '../assets/Minecraft-Heart.png'; // Path to the frame image

// Draw the board once the frame image has loaded
frameImage.onload = () => {
  drawBoard();
};

// Function to draw the game board
function drawBoard() {
  // Loop through each row in the board
  for (let row = 0; row < board.length; row++) {
    // Loop through each column in the current row
    for (let col = 0; col < board[row].length; col++) {
      const value = board[row][col];
      
      // Calculate the position (x, y) of the cell
      const x = col * cellSize;
      const y = row * cellSize;
      
      // Draw the cell based on its value
      if (value === 3) {
        // Draw the "Minecraft Heart" image for the border cells
        ctx.drawImage(frameImage, x, y, cellSize, cellSize);
      } else if (value === 0) {
        // Empty cell (background color)
        ctx.fillStyle = '#ffffff'; // White for empty cells
        ctx.fillRect(x, y, cellSize, cellSize);
      } else {
        // Other values (like snake or food) can be added here
        ctx.fillStyle = '#00ff00'; // Green, for example (could be the snake)
        ctx.fillRect(x, y, cellSize, cellSize);
      }
      
      // Add borders to visualize the grid
      ctx.strokeStyle = '#000000'; // Black border for grid cells
      ctx.strokeRect(x, y, cellSize, cellSize);
    }
  }
}
