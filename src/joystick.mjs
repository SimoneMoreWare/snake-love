export class JoystickController {
  constructor(stickID, maxDistance, deadzone, minMoveDistance) {
    this.id = stickID;
    let stick = document.getElementById(stickID);
    this.dragStart = null;
    this.touchId = null;
    this.active = false;
    this.value = { x: 0, y: 0 };
    let self = this;

    function handleDown(event) {
      self.active = true;
      stick.style.transition = '0s';
      event.preventDefault();
      if (event.changedTouches)
        self.dragStart = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
      else
        self.dragStart = { x: event.clientX, y: event.clientY };
      if (event.changedTouches)
        self.touchId = event.changedTouches[0].identifier;
    }

    function handleMove(event) {
      if (!self.active) return;
      let touchmoveId = null;
      if (event.changedTouches) {
        for (let i = 0; i < event.changedTouches.length; i++) {
          if (self.touchId == event.changedTouches[i].identifier) {
            touchmoveId = i;
            event.clientX = event.changedTouches[i].clientX;
            event.clientY = event.changedTouches[i].clientY;
          }
        }
        if (touchmoveId == null) return;
      }
      const xDiff = event.clientX - self.dragStart.x;
      const yDiff = event.clientY - self.dragStart.y;
      const angle = Math.atan2(yDiff, xDiff);
      const distance = Math.min(maxDistance, Math.hypot(xDiff, yDiff));
      const xPosition = distance * Math.cos(angle);
      const yPosition = distance * Math.sin(angle);
      
      // Modified transform to use translate(-50%, -50%) as base position
      stick.style.transform = `translate(calc(-50% + ${xPosition}px), calc(-50% + ${yPosition}px))`;

      const distance2 = (distance < deadzone) ? 0 : maxDistance / (maxDistance - deadzone) * (distance - deadzone);
      const xPosition2 = distance2 * Math.cos(angle);
      const yPosition2 = distance2 * Math.sin(angle);

      // Calcolare la percentuale di movimento
      let xPercent = parseFloat((xPosition2 / maxDistance).toFixed(4));
      let yPercent = parseFloat((yPosition2 / maxDistance).toFixed(4));

      // Inibire le diagonali: se entrambi sono quasi uguali, considera solo uno dei due
      if (Math.abs(xPercent) < 0.2 && Math.abs(yPercent) < 0.2) {
        xPercent = 0;
        yPercent = 0;
      }

      // Ridurre l'intensità: muovi solo se la distanza è oltre una soglia minima
      if (Math.hypot(xDiff, yDiff) < minMoveDistance) {
        xPercent = 0;
        yPercent = 0;
      }

      self.value = { x: xPercent, y: yPercent };
    }

    function handleUp(event) {
      if (!self.active) return;
      if (event.changedTouches && self.touchId != event.changedTouches[0].identifier) return;
      stick.style.transition = '.2s';
      
      // Reset to center position based on the CSS
      stick.style.transform = 'translate(-50%, -50%)';
      
      self.value = { x: 0, y: 0 };
      self.touchId = null;
      self.active = false;
    }

    function updateBasePosition() {
      // Ottieni la dimensione ottimale del joystick in base allo schermo
      const isLandscape = window.innerWidth > window.innerHeight;
      const joystickSize = isLandscape 
          ? Math.min(128, window.innerHeight * 0.2)
          : Math.min(128, window.innerWidth * 0.3);
      
      // Aggiorna le dimensioni del joystick
      const joystickContainer = document.getElementById('joystick-container');
      if (joystickContainer) {
          joystickContainer.style.width = `${joystickSize}px`;
      }
      
      // Resetta la posizione dello stick
      const stickElement = document.getElementById('stick');
      if (stickElement) {
          stickElement.style.transform = 'translate(-50%, -50%)';
      }
      
      // Aggiorna le variabili interne di posizione se necessario
      if (self && stick) {
          stick.style.transform = 'translate(-50%, -50%)';
          self.value = { x: 0, y: 0 };
      }
    }

    // Add window resize event listener to update position
    window.addEventListener('resize', updateBasePosition);
    
    // Initial position setup
    updateBasePosition();

    stick.addEventListener('mousedown', handleDown);
    stick.addEventListener('touchstart', handleDown);
    document.addEventListener('mousemove', handleMove, { passive: false });
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchend', handleUp);
  }
}