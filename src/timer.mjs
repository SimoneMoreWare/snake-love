export class Timer {
    constructor() {
        this.startTime = null;
        this.timerInterval = null;
    }

    start() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => this.update(), 1000);
    }

    update() {
        const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
        const seconds = (elapsedTime % 60).toString().padStart(2, '0');
        document.getElementById('timer').textContent = `${minutes}:${seconds}`;
    }

    stop() {
        clearInterval(this.timerInterval);
    }

    reset() {
        this.stop();
        document.getElementById('timer').textContent = "00:00";
    }
}
