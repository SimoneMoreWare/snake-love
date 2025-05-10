// audioController.mjs
let isSoundEnabled = true // Di default il suono è attivato

// Funzione per riprodurre un suono se abilitato
export function playSound(soundPath) {
  if (isSoundEnabled) {
    const sound = new Audio(soundPath)
    sound
      .play()
      .catch((error) =>
        console.error('Errore nella riproduzione audio:', error),
      )
  }
}

// Funzione per attivare/disattivare l'audio
export function toggleSound() {
  isSoundEnabled = !isSoundEnabled
  updateSoundIcon()
  return isSoundEnabled
}

// Funzione per impostare lo stato dell'audio
export function setSoundEnabled(enabled) {
  isSoundEnabled = enabled
  updateSoundIcon()
}

// Funzione per ottenere lo stato corrente dell'audio
export function getSoundEnabled() {
  return isSoundEnabled
}

// Aggiorna l'icona del suono in base allo stato
function updateSoundIcon() {
  const soundIcon = document.getElementById('sound-toggle')
  if (soundIcon) {
    soundIcon.innerHTML = isSoundEnabled ? '🔊' : '🔇'
    soundIcon.setAttribute(
      'aria-label',
      isSoundEnabled ? 'Disattiva audio' : 'Attiva audio',
    )
  }
}

// Crea e aggiunge il pulsante per il controllo del suono
export function createSoundToggleButton() {
  // Verifica se il pulsante esiste già
  if (document.getElementById('sound-toggle')) {
    return
  }

  const soundButton = document.createElement('button')
  soundButton.id = 'sound-toggle'
  soundButton.classList.add('sound-toggle')
  soundButton.innerHTML = isSoundEnabled ? '🔊' : '🔇'
  soundButton.setAttribute(
    'aria-label',
    isSoundEnabled ? 'Disattiva audio' : 'Attiva audio',
  )

  soundButton.addEventListener('click', () => {
    toggleSound()
  })

  // Posiziona il pulsante nell'angolo superiore destro
  soundButton.style.position = 'fixed'
  soundButton.style.top = '10px'
  soundButton.style.right = '10px'
  soundButton.style.zIndex = '2000'
  soundButton.style.fontSize = '24px'
  soundButton.style.background = 'rgba(0, 0, 0, 0.5)'
  soundButton.style.color = 'white'
  soundButton.style.border = 'none'
  soundButton.style.borderRadius = '50%'
  soundButton.style.width = '40px'
  soundButton.style.height = '40px'
  soundButton.style.cursor = 'pointer'
  soundButton.style.display = 'flex'
  soundButton.style.justifyContent = 'center'
  soundButton.style.alignItems = 'center'
  soundButton.style.padding = '0'

  document.body.appendChild(soundButton)
}
