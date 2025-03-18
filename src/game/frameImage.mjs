// src/game/frameImage.mjs
const frameImage = new Image();
frameImage.src = '../assets/Minecraft-Heart.png'; // Percorso dell'immagine

// Restituisce una Promise che risolve quando l'immagine è caricata
export function loadFrameImage() {
    return new Promise((resolve) => {
        frameImage.onload = () => resolve(frameImage); // Risolvi quando l'immagine è caricata
    });
}

export default frameImage;
