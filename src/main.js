// Umrechnungsfaktor: Pixel pro mm (anpassbar)
const pxPerMm = 4; // z.B. 4 Pixel pro mm
const rasterMm = 5; // Rasterabstand in mm

// Ursprung um 1 Raster verschieben
let nullPxX = rasterMm * pxPerMm;
let NullPxY = 0; // Dynamisch gesetzt in drawCanvas

// Das sind die möglichen optischen Flächen
const opticalSurfaces = [];
opticalSurfaces.push({
    xFixed: 40,     // Fixpunkt an X=20mm
    yMin: -30,   // von Y= -,, bis
    yMax: 30,   // Y= ..
    focusRadius: 80,   // Brennweite 100mm, negativ = Konkav, positiv = Konvex, 0: Ebene
    relPermittivity: 3 // relative Permittivität, danach Medium
});
opticalSurfaces.push({
    xFixed: 60,
    yMin: -30,
    yMax: 30,
    focusRadius: 0,
    relPermittivity: 1 // Danach Luft
});

const canvas = document.getElementById('radar-canvas');
if (!(canvas instanceof HTMLCanvasElement)) {
    // Fehlerfall: canvas ist kein HTMLCanvasElement
    throw new Error('Element mit ID "radar-canvas" ist kein Canvas!');
}
const context = canvas.getContext('2d');
if (!context) {
    throw new Error('2D context not available');
}
// Berechnet den x-Versatz für einen gegebenen y-Wert und optionaler Brennweite
function calcDx(y, focusRadius) {
    if (focusRadius === 0) return 0;
    let dx = Math.abs(focusRadius) - Math.sqrt(focusRadius * focusRadius - y * y);
    if (isNaN(dx)) dx = Math.abs(focusRadius); // y ist außerhalb des Kreises
    if (focusRadius > 0) return dx;
    return -dx;
}
function drawCanvas() {
    const bRect = canvas.getBoundingClientRect();
    const bWidth = Math.floor(bRect.width);
    const bHeight = Math.floor(bRect.height);
    if (canvas.width !== bWidth || canvas.height !== bHeight) {
        canvas.width = bWidth;
        canvas.height = bHeight;
    }
    // Y-Achse invertieren, damit -y unten ist und 
    NullPxY = canvas.height / 2; // Mittelpunkt des Canvas als Ursprung
    context.setTransform(1, 0, 0, -1, 0, canvas.height);
    canvasBackground();
    drawSurfaces();
}

function drawSurfaces() {
    // Zeichnet die optischen Flächen
    opticalSurfaces.forEach(surface => {
        const x0 = surface.xFixed;
        const yu = surface.yMin;
        const yo = surface.yMax;
        const step = 1 / rasterMm; // Abstand der Punkte in Pixeln

        context.save();
        context.strokeStyle = (surface.relPermittivity > 1) ? '#00ff00' : '#f700ffff'; // grün
        context.lineWidth = 1;

        context.beginPath();
        for (let y = yu; y <= yo; y += step) {
            const x = x0 + calcDx(y, surface.focusRadius);

            const px = (x * pxPerMm) + nullPxX;
            const py = (y * pxPerMm) + NullPxY;
            if (y === yu) {
                context.moveTo(px, py);
            } else {
                context.lineTo(px, py);
            }
        }
        context.stroke();

        context.restore();
    }
    );
}

function canvasBackground() {

    // Hintergrundfarbe
    context.save();
    context.fillStyle = '#101020';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Kariertes Linienraster zeichnen
    const gridSpacing = rasterMm * pxPerMm; // 5 mm Abstand
    context.save();
    context.strokeStyle = '#22232a'; // dunkles Grau
    context.lineWidth = 1;

    // X Vertikale Linien
    for (let x = -nullPxX; x <= canvas.width; x += gridSpacing) {
        context.beginPath();
        context.moveTo(x + nullPxX, 0);
        context.lineTo(x + nullPxX, canvas.height);
        context.stroke();
    }
    // Y Horizontale Linien
    for (let y = -NullPxY; y <= canvas.height; y += gridSpacing) {
        context.beginPath();
        context.moveTo(0, y + NullPxY);
        context.lineTo(canvas.width, y + NullPxY);
        context.stroke();
    }

    context.restore();

    // Emitter - Roten Kreis bei (0,0) mit 2mm Durchmesser zeichnen
    context.save();
    context.beginPath();
    context.arc(nullPxX, NullPxY, pxPerMm, 0, 2 * Math.PI); // Radius = 1mm = pxPerMm
    context.fillStyle = 'red';
    context.fill();
    context.restore();


    // Nur zum Test - Strahlenförmige radiale Linien zeichnen
    if (0) {
        context.save();
        context.strokeStyle = '#ff8800'; // Orange für Strahlen
        context.lineWidth = 1;

        const startAngleDeg = -30;
        const endAngleDeg = 30;
        const angleStep = 3;
        const originX = nullPxX;
        const originY = NullPxY;
        const maxRadius = Math.max(canvas.width, canvas.height);

        for (let angleDeg = startAngleDeg; angleDeg <= endAngleDeg; angleDeg += angleStep) {
            const angleRad = angleDeg * Math.PI / 180;
            const x = originX + maxRadius * Math.cos(angleRad);
            const y = originY + maxRadius * Math.sin(angleRad);
            context.beginPath();
            context.moveTo(originX, originY);
            context.lineTo(x, y);
            context.stroke();
        }
        context.restore();
        // Strahlen Ende
    }

};

window.addEventListener('resize', drawCanvas);
drawCanvas();

