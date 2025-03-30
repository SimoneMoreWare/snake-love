// Funzione per aggiungere il pulsante pausa
export function setupPauseButton(game) {
  // Rimuovi eventuali pulsanti pausa esistenti
  const existingButton = document.getElementById('pause-button')
  if (existingButton) {
    existingButton.remove()
  }

  // Crea il pulsante pausa
  const pauseButton = document.createElement('button')
  pauseButton.id = 'pause-button'
  pauseButton.innerHTML = '⏸️ Pausa'
  pauseButton.classList.add('game-button')
  pauseButton.style.position = 'absolute'
  pauseButton.style.top = '10px'
  pauseButton.style.left = '10px'
  pauseButton.style.zIndex = '2000' // Aumentato z-index per essere sopra il pause overlay
  pauseButton.style.padding = '8px 12px'
  pauseButton.style.backgroundColor = '#FF88B9'
  pauseButton.style.border = 'none'
  pauseButton.style.borderRadius = '5px'
  pauseButton.style.fontFamily = 'Arcade, sans-serif'
  pauseButton.style.cursor = 'pointer'

  document.body.appendChild(pauseButton)

  // Event listener per il pulsante pausa
  pauseButton.addEventListener('click', function (event) {
    // Previeni il comportamento di default
    event.preventDefault()
    event.stopPropagation()

    // Controllo se il gioco esiste ed è inizializzato
    if (game && !game.isGameOver) {
      // Chiama direttamente togglePause dell'istanza di Game
      game.togglePause()
    }

    return false
  })
}
