export class Timer {
  constructor() {
    this.startTime = null
    this.elapsedTime = 0 // Aggiungi questa variabile per tenere traccia del tempo già trascorso
    this.timerInterval = null
  }

  start() {
    console.log('Timer started') // Log per il debug
    if (this.timerInterval !== null) return // Evita di avviare più timer

    this.startTime = Date.now() - this.elapsedTime * 1000 // Continua dal tempo precedente
    this.timerInterval = setInterval(() => this.update(), 1000)
  }

  update() {
    const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000)
    this.elapsedTime = elapsedTime // Memorizza il tempo trascorso
    const minutes = Math.floor(elapsedTime / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (elapsedTime % 60).toString().padStart(2, '0')
    document.getElementById('timer').textContent = `${minutes}:${seconds}`
  }

  stop() {
    console.log('Timer stopped') // Log per il debug
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
      this.timerInterval = null
    }
  }

  reset() {
    this.stop()
    this.elapsedTime = 0 // Azzeriamo anche il tempo trascorso
    document.getElementById('timer').textContent = '00:00'
  }
}
