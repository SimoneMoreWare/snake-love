// Aggiungi questo al tuo index.mjs o crea un nuovo file fullscreen.mjs

export function setupFullscreenAndOrientation() {
  // Funzione per entrare in modalità fullscreen
  function enterFullscreen() {
    const element = document.documentElement

    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      // Firefox
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      // Chrome, Safari, Opera
      element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
      // IE/Edge
      element.msRequestFullscreen()
    }

    // Blocca l'orientamento se supportato
    lockOrientation()
  }

  // Funzione per bloccare l'orientamento in base a quello attuale
  function lockOrientation() {
    if (screen.orientation && screen.orientation.lock) {
      if (window.innerWidth > window.innerHeight) {
        screen.orientation
          .lock('landscape')
          .catch((e) => console.log('Orientation lock not supported'))
      } else {
        screen.orientation
          .lock('portrait')
          .catch((e) => console.log('Orientation lock not supported'))
      }
    }
  }

  // Aggiungi un bottone per entrare in fullscreen
  const fullscreenButton = document.createElement('button')
  fullscreenButton.id = 'fullscreen-button'
  fullscreenButton.innerHTML = '📱 Fullscreen'
  fullscreenButton.classList.add('game-button')
  fullscreenButton.style.position = 'absolute'
  fullscreenButton.style.top = '10px'
  fullscreenButton.style.right = '10px'
  fullscreenButton.style.zIndex = '1000'
  fullscreenButton.style.padding = '8px 12px'
  fullscreenButton.style.backgroundColor = '#FF88B9'
  fullscreenButton.style.border = 'none'
  fullscreenButton.style.borderRadius = '5px'
  fullscreenButton.style.fontFamily = 'Arcade, sans-serif'
  fullscreenButton.style.cursor = 'pointer'

  document.body.appendChild(fullscreenButton)

  // Event listener per il pulsante fullscreen
  fullscreenButton.addEventListener('click', enterFullscreen)

  // Rileva cambiamenti di orientamento
  window.addEventListener('orientationchange', () => {
    // Piccolo ritardo per permettere al browser di completare la rotazione
    setTimeout(() => {
      // Richiama adjustStyles per adattare la griglia
      const event = new CustomEvent('window-resized')
      document.dispatchEvent(event)
    }, 200)
  })

  // Auto-fullscreen su mobile al primo tocco
  let firstTouch = true
  window.addEventListener(
    'touchstart',
    () => {
      if (firstTouch && window.innerWidth < 1024) {
        enterFullscreen()
        firstTouch = false
      }
    },
    { once: true },
  )
}

// Chiamare questa funzione all'avvio del gioco
document.addEventListener('DOMContentLoaded', setupFullscreenAndOrientation)
