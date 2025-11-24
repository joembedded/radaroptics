/* 
Sehr einfache (Radar-) Strahlenoptik-Simulation fuers "Radarli" Projekt 

*/

// Umrechnungsfaktor: Pixel pro mm (anpassbar)
let pxPerMm = 6; // z.B. 4 Pixel pro mm
const rasterMm = 5; // Rasterabstand in mm
const waveLengthMm = 5; // Vakuum-Wellenlänge in mm (z.B. 5mm = 60GHz   )

// AUSWAHL: 0-2, siehe if()
// URL-Parameter auslesen
const myUrlParams = new URLSearchParams(window.location.search);
const modelParam = myUrlParams.get('model');
let usedModel = modelParam !== null ? parseInt(modelParam, 10) : 1;
// Fallback auf 1, falls ungültig
if (isNaN(usedModel) || usedModel < 0 || usedModel > 2) {
    usedModel = 0;
}

let startAngleDeg = -36;
let endAngleDeg = 36;
let angleStep = 2;
let anmerkung = "Unbekanntes Modell";
// Das sind die möglichen optischen Flächen. Mindestens sind noetig
// eine Eintrittsfläche und eine Austrittsfläche.
// Die X-Distanz sollte so sortiert werden, dass zuerst getroffene Flächen
// auch zuerst in der Liste erscheinen, auch wenn z.B für Fesnel Linse sie übereinander liegen
const opticalSurfaces = [];

if (usedModel === 0) {
    anmerkung = "Grossem, plankonvexe Linse mit hyperbolischer Eintrittsfläche";

    // Variante 0- Eintrittsfläche Hyperbolische Linse    
    opticalSurfaces.push({
        xFixed: 10,     // Fixpunkt an X=20mm
        yMin: -12.5,   // von Y= -,, bis
        yMax: 12.5,   // Y= ..
        focusRadius: 6.5,   // Brennweite 100mm, negativ = Konkav, positiv = Konvex, 0: Ebene
        relPermittivity: 2.7, // relative Permittivität, danach Medium. 3: Brechungsindex: n = sqrt(3) = 1.732
        hyperK: -2.7 // hyperK=0: Kugel, K= -1: Parabel, K< -1: Hyperbel
    });
    // Austrittsfläche - Fuer planaere Linse EBEN
    opticalSurfaces.push({
        xFixed: 16.5,     // Fixpunkt an X>=16.5mm
        yMin: -12.5,   // von Y= -,, bis
        yMax: 12.5,   // Y= ..
        focusRadius: 0,   // Brennweite 100mm, negativ = Konkav, positiv = Konvex, 0: Ebene
        relPermittivity: 1, // relative Permittivität, danach Medium, Brechungsindex auch 1 (Luft)
        hyperK: 0 // hyperK=0: Kugel, K= -1: Parabel, K< -1: Hyperbel
    });
    // Ende Variante 0
} else if (usedModel === 1) {
    anmerkung = "Plankonvexe Linse mit hyperbolischer(hyperK<0)/sphärischer(hyperK=0) Austrittsfläche";
    
    // Variante - Austrittsfläche Hyperbolische Linse  - als Sphäre gut druckbar
    // Eintrittsflache - Fuer planaere Linse EBEN
    opticalSurfaces.push({
        xFixed: 15,     // Fixpunkt an X=
        yMin: -12.5,   // von Y= -,, bis
        yMax: 12.5,   // Y= ..
        focusRadius: 0,   // Brennweite mm, negativ = Konkav, positiv = Konvex, 0: Ebene
        relPermittivity: 2.7, // relative Permittivität, danach Medium, Brechungsindex auch 1 (Luft)
        hyperK: 0 // hyperK=0: Kugel, K= -1: Parabel, K< -1: Hyperbel
    });
    // Austrittsfläche - Hyperbolisch/Sphaerisch
    opticalSurfaces.push({
        xFixed: 23,     // Fixpunkt an X=20mm
        yMin: -12.5,   // von Y= -,, bis
        yMax: 12.5,   // Y= ..
        focusRadius: -13.5,   // Brennweite 100mm, negativ = Konkav, positiv = Konvex, 0: Ebene
        relPermittivity: 1, // relative Permittivität, danach Medium. 3: Brechungsindex: n = sqrt(3) = 1.732
        hyperK: -0.5 // hyperK=0: Kugel, K= -1: Parabel, K< -1: Hyperbel
    });
    // Ende Variante 1

} else if (usedModel === 2) {
    startAngleDeg = -30;
    endAngleDeg = 30;

    anmerkung = "Fresnel-Linse (schick, aber evtl. nicht maximal optimal)";
    // Variante Model 3- Fresnel Linse - Raender zuerst!
    opticalSurfaces.push({
        xFixed: 25.8,     // Fixpunkt an X=20mm
        yMin: -23.0,   // von Y= -,, bis
        yMax: -10.0,   // Y= ..
        focusRadius: 19.2,   // Brennweite 100mm, negativ = Konkav, positiv = Konvex, 0: Ebene
        relPermittivity: 3, // relative Permittivität, danach Medium. 3: Brechungsindex: n = sqrt(3) = 1.732
        hyperK: -2.9 // hyperK=0: Kugel, K= -1: Parabel, K< -1: Hyperbel
    });
    opticalSurfaces.push({
        xFixed: 25.8,     // Fixpunkt an X=20mm
        yMin: 10.0,   // von Y= -,, bis
        yMax: 23.0,   // Y= ..
        focusRadius: 19.2,   // Brennweite 100mm, negativ = Konkav, positiv = Konvex, 0: Ebene
        relPermittivity: 3, // relative Permittivität, danach Medium. 3: Brechungsindex: n = sqrt(3) = 1.732
        hyperK: -2.9 // hyperK=0: Kugel, K= -1: Parabel, K< -1: Hyperbel
    });

    opticalSurfaces.push({ // Innen
        xFixed: 32.5,     // Fixpunkt an X=20mm
        yMin: - 12.7/*-10*/,   // von Y= - (etwas groesser fuer Fresnel)
        yMax: 12.7 /*10*/,   // Y= ..
        focusRadius: 24.2,   // Brennweite 100mm, negativ = Konkav, positiv = Konvex, 0: Ebene
        relPermittivity: 3, // relative Permittivität, danach Medium. 3: Brechungsindex: n = sqrt(3) = 1.732
        hyperK: -2.9 // hyperK=0: Kugel, K= -1: Parabel, K< -1: Hyperbel
    });
    // Austrittsfläche - Fuer planaere Linse EBEN
    opticalSurfaces.push({
        xFixed: 35,     // Fixpunkt an X=20mm
        yMin: -23,   // von Y= -,, bis
        yMax: 23,   // Y= ..
        focusRadius: 0,   // Brennweite 100mm, negativ = Konkav, positiv = Konvex, 0: Ebene
        relPermittivity: 1, // relative Permittivität, danach Medium, Brechungsindex auch 1 (Luft)
        hyperK: 0 // hyperK=0: Kugel, K= -1: Parabel, K< -1: Hyperbel
    });
    // Ende Variante Model 3
}

// Eine EndLeinwand fuer den austretenden Strahl, im Prinzip nur ein Platzhalter
opticalSurfaces.push({
    xFixed: 10000,
    yMin: -100000,
    yMax: 100000,
    focusRadius: 0,
    relPermittivity: 1, // Danach Luft
    hyperK: 0 // hyperK=0: Kugel, K= -1: Parabel, K< -1: Hyperbel
});



// --- Angle controls for UI ---
const angleFields = [
    { key: 'startAngleDeg', label: 'Start °;', step: 1 },
    { key: 'endAngleDeg', label: 'Ende °:', step: 1 },
    { key: 'angleStep', label: 'Schritt °:', step: 0.1, min: 0.1 }
];
const angleInputIds = {
    startAngleDeg: 'start-angle-deg-input',
    endAngleDeg: 'end-angle-deg-input',
    angleStep: 'angle-step-input'
};

// Insert angle controls into surface editor UI
function handleAngleInput(event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    const key = target.dataset.angleKey;
    if (!key) return;
    let value = Number(target.value.trim());
    if (!Number.isFinite(value)) return;
    if (key === 'angleStep') value = Math.max(0.1, value);
    if (key === 'startAngleDeg') startAngleDeg = value;
    else if (key === 'endAngleDeg') endAngleDeg = value;
    else if (key === 'angleStep') angleStep = value;
}

function renderAngleControls(container) {
    const angleRow = document.createElement('div');
    angleRow.className = 'angle-controls';
    angleFields.forEach(field => {
        const label = document.createElement('label');
        label.setAttribute('for', angleInputIds[field.key]);
        label.textContent = field.label;
        label.style.marginLeft = '16px';
        const input = document.createElement('input');
        input.type = 'number';
        input.id = angleInputIds[field.key];
        input.step = field.step;

        if (field.min !== undefined) input.min = field.min;
        input.value = (field.key === 'startAngleDeg') ? startAngleDeg :
            (field.key === 'endAngleDeg') ? endAngleDeg : angleStep;
        input.inputMode = 'decimal';
        input.dataset.angleKey = field.key;
        input.addEventListener('change', handleAngleInput);
        input.addEventListener('input', handleAngleInput);
        label.appendChild(input);
        angleRow.appendChild(label);
    });
    container.appendChild(angleRow);
}

// Patch initSurfaceEditor to add angle controls next to pxPerMm
const origInitSurfaceEditor = initSurfaceEditor;
initSurfaceEditor = function () {
    if (!surfaceEditorContainer) return;
    const fragment = document.createDocumentFragment();

    // pxPerMm controls
    const controlsRow = document.createElement('div');
    controlsRow.className = 'surface-editor-controls';

    const label = document.createElement('label');
    label.setAttribute('for', pxPerMmInputId);
    label.textContent = 'Pixel per mm:';

    const input = document.createElement('input');
    input.type = 'number';
    input.id = pxPerMmInputId;
    input.step = '0.1';
    input.min = '0.1';
    input.value = pxPerMm.toString();
    input.inputMode = 'decimal';
    input.addEventListener('change', handlePxPerMmInput);
    input.addEventListener('input', handlePxPerMmInput);

    label.appendChild(input);
    controlsRow.appendChild(label);

    // Add angle controls
    renderAngleControls(controlsRow);

    fragment.appendChild(controlsRow);

    // Call original logic for the rest
    // (copy-paste the rest of origInitSurfaceEditor, skipping pxPerMm controls)
    // --- BEGIN original code after pxPerMm controls ---
    const editableCount = Math.max(opticalSurfaces.length - 1, 0);
    if (!editableCount) {
        const info = document.createElement('p');
        info.className = 'surface-editor-empty';
        info.textContent = 'Keine Flaechen zum Bearbeiten vorhanden.';
        fragment.appendChild(info);
        surfaceEditorContainer.replaceChildren(fragment);
        return;
    }

    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.textContent = 'Optische Flaechen bearbeiten:';
    table.appendChild(caption);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Flaeche';
    headerRow.appendChild(nameHeader);

    surfaceEditorFields.forEach(field => {
        const th = document.createElement('th');
        th.textContent = field.label;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    for (let index = 0; index < editableCount; index += 1) {
        const surface = opticalSurfaces[index];
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.innerHTML = `<u>F${index + 1}</u> &#128279;`; // Unicode Link-Symbol
        nameCell.style.cursor = 'pointer';
        nameCell.addEventListener('click', () => {
            handleSurfaceNameClick(surface, `F${index + 1}`);
        });
        row.appendChild(nameCell);

        surfaceEditorFields.forEach(field => {
            const cell = document.createElement('td');
            // Alle Felder jetzt editierbar
            const inputField = document.createElement('input');
            inputField.type = 'number';
            inputField.pattern = '-?[0-9]*';
            inputField.inputMode = 'decimal';
            inputField.step = field.step ? String(field.step) : '1';
            if (Object.prototype.hasOwnProperty.call(field, 'min')) inputField.min = String(field.min);
            if (Object.prototype.hasOwnProperty.call(field, 'max')) inputField.max = String(field.max);
            inputField.value = surface[field.key].toString();
            inputField.dataset.surfaceIndex = String(index);
            inputField.dataset.fieldKey = field.key;
            inputField.addEventListener('change', handleSurfaceEditorInput);
            inputField.addEventListener('input', handleSurfaceEditorInput);
            cell.appendChild(inputField);
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    fragment.appendChild(table);
    surfaceEditorContainer.replaceChildren(fragment);
    // --- END original code ---
};


// Ursprung um 1 X-Raster und Y-mittig verschieben
let nullPxX = rasterMm * pxPerMm;
let nullPxY = 0; // Dynamisch gesetzt in drawCanvas

const surfaceEditorContainer = document.getElementById('surface-editor');
const surfaceEditorFields = [
    { key: 'xFixed', label: 'xFixed (mm)', step: 0.1 },
    { key: 'yMin', label: 'yMin (mm)', step: 0.1 }, // jetzt editierbar
    { key: 'yMax', label: 'yMax (mm)', step: 0.1 },
    { key: 'focusRadius', label: 'focusRadius (mm)', step: 0.1 },
    { key: 'relPermittivity', label: 'relPermittivity', step: 0.1, min: 0.1 },
    { key: 'hyperK', label: 'hyperK', step: 0.1 }
];
const yMinCellIdPrefix = 'surface-ymin-';
const pxPerMmInputId = 'px-per-mm-input';


//-----------Funktionen Datenzugriff---------------
let popup = null;
function handleSurfaceNameClick(surface, name) {
    let details = `
    Flaeche: ${name}:
    ------------------------------
    xFixed: ${surface.xFixed} mm
    yMin: ${surface.yMin} mm
    yMax: ${surface.yMax} mm
    focusRadius: ${surface.focusRadius} mm
    relPermittivity: ${surface.relPermittivity}
    hyperK: ${surface.hyperK}

    Sagitta-Kontroll-Werte:
    ------------------------------   
`;
    const anzWerte = 15;
    for (let i = 0; i < anzWerte; i++) {
        const y = surface.yMin + (surface.yMax - surface.yMin) * i / (anzWerte - 1);
        const sag = calcSag(y, surface.focusRadius, surface.hyperK);
        details += `    y: ${y.toFixed(2)} mm => sag: ${sag.toFixed(4)} mm\n`;
    }

    // Popup-Fenster erstellen
    if (popup !== null) {
        document.body.removeChild(popup);
    }
    popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.background = '#222';
    popup.style.color = '#fff';
    popup.style.padding = '20px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 4px 16px rgba(0,0,0,0.5)';
    popup.style.zIndex = '10000';
    popup.style.maxWidth = '90vw';
    popup.style.maxHeight = '80vh';
    popup.style.overflowY = 'auto';
    popup.style.fontFamily = 'monospace';
    popup.style.border = '1.5px solid #0a225d'; // Dünner dunkelblauer Rahmen

    // Close-Button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Schließen';
    closeBtn.style.float = 'right';
    closeBtn.style.marginLeft = '10px';
    closeBtn.style.background = '#444';
    closeBtn.style.color = '#fff';
    closeBtn.style.border = 'none';
    closeBtn.style.padding = '4px 12px';
    closeBtn.style.borderRadius = '4px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(popup);
        popup = null;
    });

    // Inhalt
    const pre = document.createElement('pre');
    pre.textContent = details;

    popup.appendChild(closeBtn);
    popup.appendChild(pre);

    document.body.appendChild(popup);
}

function initSurfaceEditor() {
    if (!surfaceEditorContainer) return;

    const fragment = document.createDocumentFragment();

    const controlsRow = document.createElement('div');
    controlsRow.className = 'surface-editor-controls';

    const label = document.createElement('label');
    label.setAttribute('for', pxPerMmInputId);
    label.textContent = 'Pixel per mm:';

    const input = document.createElement('input');
    input.type = 'number';
    input.id = pxPerMmInputId;
    input.step = '0.1';
    input.min = '0.1';
    input.value = pxPerMm.toString();
    input.inputMode = 'decimal';
    input.addEventListener('change', handlePxPerMmInput);
    input.addEventListener('input', handlePxPerMmInput);

    controlsRow.appendChild(label);
    controlsRow.appendChild(input);
    fragment.appendChild(controlsRow);

    const editableCount = Math.max(opticalSurfaces.length - 1, 0);
    if (!editableCount) {
        const info = document.createElement('p');
        info.className = 'surface-editor-empty';
        info.textContent = 'Keine Flaechen zum Bearbeiten vorhanden.';
        fragment.appendChild(info);
        surfaceEditorContainer.replaceChildren(fragment);
        return;
    }

    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.textContent = 'Optische Flaechen bearbeiten:';
    table.appendChild(caption);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Flaeche';
    headerRow.appendChild(nameHeader);

    surfaceEditorFields.forEach(field => {
        const th = document.createElement('th');
        th.textContent = field.label;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    for (let index = 0; index < editableCount; index += 1) {
        const surface = opticalSurfaces[index];
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.innerHTML = `<u>F${index + 1}</u> &#128279;`; // Unicode Link-Symbol
        nameCell.style.cursor = 'pointer';
        nameCell.addEventListener('click', () => {
            handleSurfaceNameClick(surface, `F${index + 1}`);
        });
        row.appendChild(nameCell);

        surfaceEditorFields.forEach(field => {
            const cell = document.createElement('td');
            // Alle Felder jetzt editierbar
            const inputField = document.createElement('input');
            inputField.type = 'number';
            //inputField.pattern = '-?[0-9]*';
            inputField.inputMode = 'decimal';
            inputField.step = field.step ? String(field.step) : '1';
            inputField.min = -100.0;
            inputField.max = 100.0;
            // if (Object.prototype.hasOwnProperty.call(field, 'min')) inputField.min = String(field.min);
            // if (Object.prototype.hasOwnProperty.call(field, 'max')) inputField.max = String(field.max);
            inputField.value = surface[field.key].toString();
            inputField.dataset.surfaceIndex = String(index);
            inputField.dataset.fieldKey = field.key;
            inputField.addEventListener('change', handleSurfaceEditorInput);
            inputField.addEventListener('input', handleSurfaceEditorInput);
            cell.appendChild(inputField);
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    fragment.appendChild(table);
    surfaceEditorContainer.replaceChildren(fragment);
}

function handlePxPerMmInput(event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;

    const valueString = target.value.trim();
    if (valueString === '') return;

    const parsedValue = Number(valueString);
    if (!Number.isFinite(parsedValue)) return;

    const sanitizedValue = Math.max(0.1, parsedValue);
    pxPerMm = sanitizedValue;
    target.value = sanitizedValue.toString();
    nullPxX = rasterMm * pxPerMm;
    drawCanvas();
}

function handleSurfaceEditorInput(event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;

    const fieldKey = target.dataset.fieldKey;
    if (!fieldKey) return;

    const surfaceIndex = Number(target.dataset.surfaceIndex);
    if (!Number.isInteger(surfaceIndex) || surfaceIndex < 0 || surfaceIndex >= opticalSurfaces.length - 1) return;

    const rawValueString = target.value.trim();
    if (rawValueString === '') return;

    const parsedValue = Number(rawValueString);
    if (!Number.isFinite(parsedValue)) return;

    const surface = opticalSurfaces[surfaceIndex];
    if (!surface) return;

    surface[fieldKey] = parsedValue;

}

function updateYMinCell(surfaceIndex, value) {
    if (!surfaceEditorContainer) return;
    const span = surfaceEditorContainer.querySelector(`#${yMinCellIdPrefix}${surfaceIndex}`);
    if (span) span.textContent = value.toString();
}

const canvas = document.getElementById('radar-canvas');
if (!(canvas instanceof HTMLCanvasElement)) throw new Error('Keine Canvas!');
const context = canvas.getContext('2d');
if (!context) throw new Error('Kein 2D Context!');

//-----------Funktionen JoEmbedded---------------
function drawCanvas() {
    nullPxX = rasterMm * pxPerMm;
    const bRect = canvas.getBoundingClientRect();
    const bWidth = Math.floor(bRect.width);
    const bHeight = Math.floor(bRect.height);
    if (canvas.width !== bWidth || canvas.height !== bHeight) {
        canvas.width = bWidth;
        canvas.height = bHeight;
    }
    // Standards - Aenderung an Canvas resetten context
    context.font = '10px Arial';
    context.fillStyle = 'white';
    context.textBaseline = 'top';

    // Y-Achse invertieren, damit -y unten ist und 
    nullPxY = canvas.height / 2; // Mittelpunkt des Canvas als Ursprung
    drawBackground();
    drawSurfaces();
    drawInfoLabel(); // Label mit Abmessungen und Skalierung
    drawRays(); // Strahlen zeichnen

}
// Zeichnet einen Punkt in mm-Koordinaten - z.B. fuer Wellenmaxima. Liefert true wenn im Feld, fasle wenn draussen
function drawDotMm(px, py, color = 'white', psize = 0.5) {
    const canx = nullPxX + px * pxPerMm;
    const cany = nullPxY - py * pxPerMm;
    if (canx < 0 || canx >= canvas.width || cany < 0 || cany >= canvas.height) return false;
    context.save();
    context.fillStyle = color;
    context.beginPath();
    context.arc(canx, cany, psize * pxPerMm, 0, 2 * Math.PI);
    context.fill();
    context.restore();
    return true;
}
// Zeichnet eine Linie in mm-Koordinaten, kein return
function drawLineMm(px1, py1, px2, py2, color = 'white', lineWidth = 0.1) {
    context.save();
    context.strokeStyle = color;
    context.lineWidth = lineWidth * pxPerMm;
    context.beginPath();
    context.moveTo(px1 * pxPerMm + nullPxX, nullPxY - py1 * pxPerMm);
    context.lineTo(px2 * pxPerMm + nullPxX, nullPxY - py2 * pxPerMm);
    context.stroke();
    context.restore();
}

// Zeichnet die Wellenfront
function drawWaveMm(rayVector, lineLenMm, relWaveLen, modulMm) {
    const stepMm = waveLengthMm * relWaveLen; // Schrittweite in mm
    let px = rayVector.currentXMm + modulMm * rayVector.dirX * relWaveLen; // Startpunkt mit Wellenmodulation
    let py = rayVector.currentYMm + modulMm * rayVector.dirY * relWaveLen;
    lineLenMm -= modulMm * relWaveLen; // Erster Punkt schon gezeichnet
    while (lineLenMm >= stepMm) {
        drawDotMm(px, py, relWaveLen === 1 ? 'gold' : 'lime', 0.2);
        px += rayVector.dirX * stepMm;
        py += rayVector.dirY * stepMm;
        lineLenMm -= stepMm;
    }
    // Letzten Punkt, falls noch Rest
    if (lineLenMm > 0) {
        drawDotMm(px, py, relWaveLen === 1 ? 'gold' : 'lime', 0.2);
    }
}



// Berechnet die sagitta (Versatz in x-Richtung) für einen gegebenen y-Wert und 
// optionaler Brennweite (focusRadius != 0) oder Planfläche (focusRadius=0)
// hyperK beschreibt die Aberation: hyperK=0: Kugel, K= -1: Parabel, K< -1: Hyperbel
function calcSag(y, focusRadius, hyperK = 0) {
    if (focusRadius === 0) return 0; // War Planflache
    const hy2 = y * y;
    // sagitta() Normalform
    let dx = hy2 / (Math.abs(focusRadius) + Math.sqrt(focusRadius * focusRadius - (1 + hyperK) * hy2));

    if (isNaN(dx)) dx = Math.abs(focusRadius); // y ist außerhalb des Kreises
    if (focusRadius > 0) return dx;
    return -dx;
}

// Iteriert Hitpunkt zur aktuellen Flaeche
function findHitToSurface(rayVector, surface) {
    let surfXHit = surface.xFixed;
    for (let i = 0; i < 100; i++) {
        const vectLenMm = (surfXHit - rayVector.currentXMm) / rayVector.dirX;
        const targX = rayVector.currentXMm + rayVector.dirX * vectLenMm;
        const targY = rayVector.currentYMm + rayVector.dirY * vectLenMm;
        const surfX = surface.xFixed + calcSag(targY, surface.focusRadius, surface.hyperK);
        const deltaX = surfX - targX;
        surfXHit += deltaX;
        if (Math.abs(deltaX) < 1e-6) {
            //console.log("Y:", targY.toFixed(4), "DX:", deltaX, "vectLenMm:", vectLenMm.toFixed(4), "Iter:", i);
            if (targY > surface.yMax || targY < surface.yMin) {
                //console.log("Ausserhalb!");
                //drawDotMm(targX, targY, 'red');
                return null; // Treffer ausserhalb der Flaeche
            }
            // Optional Trefferpunkt
            //drawDotMm(targX, targY, 'yellow'); // Trefferpunkt
            const tStepMm = 0.1; // mm
            const tLowMm = calcSag(targY + tStepMm, surface.focusRadius, surface.hyperK);
            const tHighMm = calcSag(targY - tStepMm, surface.focusRadius, surface.hyperK);
            const tSteilheit = (tHighMm - tLowMm) / (2 * tStepMm);
            // console.log("TStep:", tStepMm, "Low:", tLowMm, "High:", tHighMm, "Steilheit:", tSteilheit);

            const orthogonalenLaenge = 5; // Laenge des Orthogonalen Strichs
            const orthogoX0 = targX + orthogonalenLaenge;
            const orthogoY0 = targY + orthogonalenLaenge * tSteilheit;
            const orthogoX1 = targX - orthogonalenLaenge;
            const orthogoY1 = targY - orthogonalenLaenge * tSteilheit;
            // Option Orthogonale an der Auftreffstelle zeichnen:
            //drawLineMm(orthogoX0, orthogoY0, orthogoX1, orthogoY1, 'deepskyblue', 0.2);

            // vectLenMm ist Multi/Distanz in mm bis zum Treffer
            return { vectLenMm: vectLenMm, hitX: targX, hitY: targY, orthoX0: orthogoX0, orthoX1: orthogoX1, orthoY0: orthogoY0, orthoY1: orthogoY1 }
        }
    }
    console.log("Konvergenzfehler: surface:", surface); // Kann am Rand passieren
    return null; // Konvergenzfehler
}
// Winkelfunktion zwischen zwei Vektoren in Radiant
function calculateWinkel(winkelA, winkelB) {
    // Vektor A
    const ax = winkelA.x1 - winkelA.x0;
    const ay = winkelA.y1 - winkelA.y0;
    // Vektor B
    const bx = winkelB.x1 - winkelB.x0;
    const by = winkelB.y1 - winkelB.y0;
    // Skalarprodukt
    const dot = ax * bx + ay * by;
    // Beträge
    const magA = Math.sqrt(ax * ax + ay * ay);
    const magB = Math.sqrt(bx * bx + by * by);
    if (magA === 0 || magB === 0) return 0; // Ungültige Vektoren
    // Winkel in Radiant
    let angle = Math.acos(dot / (magA * magB));
    return angle; // Radiant
}

function drawRays() {
    // Zeichnet die Strahlen

    context.save();
    for (let angleDeg = startAngleDeg; angleDeg <= endAngleDeg; angleDeg += angleStep) {
        const angleRad = angleDeg * Math.PI / 180;
        const rayVector = {
            currentXMm: 0, // Start bei (0,0) in mm 
            currentYMm: 0,
            dirX: Math.cos(angleRad),  // und in Richtung des Winkels
            dirY: Math.sin(angleRad),
            currentMediumPermitivity: 1, // Start im Medium Luft 
        };
        let frameWaveShiftMm = globalWaveShift; // Wellenverschiebung (0 bis Wellenlange Mm )

        // Berechne den nächsten Schnittpunkt mit einer optischen Fläche
        let idx = 0;
        for (const surface of opticalSurfaces) {
            idx++; // Fuers Debug
            const hitInfo = findHitToSurface(rayVector, surface);
            if (!hitInfo) continue; // Vlt. mit naehster Flaeche versuchen
            //console.log("DistMm:", hitInfo);
            const winkelA = {
                x0: rayVector.currentXMm,
                y0: rayVector.currentYMm,
                x1: hitInfo.hitX,
                y1: hitInfo.hitY
            };
            const winkelB = { // Senkrechte zur Oberfläche
                x0: hitInfo.orthoX1,
                y0: hitInfo.orthoY1,
                x1: hitInfo.orthoX0,
                y1: hitInfo.orthoY0
            };
            const einfallsWinkel = calculateWinkel(winkelA, winkelB);
            // console.log("Einfallswinkel (deg):", (einfallsWinkel * 180 / Math.PI).toFixed(3));
            // Brechungswinkel nach Snellius
            const n1lightspeedRel = Math.sqrt(rayVector.currentMediumPermitivity); // Brechungsindex Medium und
            const n2lightspeedRel = Math.sqrt(surface.relPermittivity); // Brechungsindex neues Medium
            const lsrel = n1lightspeedRel / n2lightspeedRel;
            const sinB = n1lightspeedRel * Math.sin(einfallsWinkel) / n2lightspeedRel;
            if (hitInfo.hitX < rayVector.currentXMm || sinB > 1) {
                //console.log("Totalreflexion/Ecke-Artefakt");
                drawLineMm(rayVector.currentXMm, rayVector.currentYMm, hitInfo.hitX, hitInfo.hitY, 'red', 0.1);
                break; // Totalreflexion, Strahl endet hier
            }
            const brechungsWinkel = Math.asin(sinB);

            //console.log(lsrel, "Brechungswinkel (deg):", (brechungsWinkel * 180 / Math.PI).toFixed(2), idx);
            // Eingangsstrahl zeichnen
            if (rayVector.currentMediumPermitivity <= 1) drawLineMm(rayVector.currentXMm, rayVector.currentYMm, hitInfo.hitX, hitInfo.hitY, 'orange', 0.1);
            else drawLineMm(rayVector.currentXMm, rayVector.currentYMm, hitInfo.hitX, hitInfo.hitY, 'green', 0.3);

            // Welle zeichnen und Rest mm berechnen
            nRel = 1 / n1lightspeedRel;
            drawWaveMm(rayVector, hitInfo.vectLenMm, nRel, frameWaveShiftMm);
            const anzWellen = hitInfo.vectLenMm / (waveLengthMm * nRel);
            //console.log("LenMm:",hitInfo.vectLenMm.toFixed(4),"=>Anz.",anzWellen.toFixed(4),"nRel:",nRel);
            const resMm = anzWellen - Math.floor(anzWellen); // Nachkommastellen
            frameWaveShiftMm -= resMm * (waveLengthMm); // Rest fuer die naechste Welle
            if (frameWaveShiftMm < 0) frameWaveShiftMm += waveLengthMm; // Korrektur
            //console.log("Rest:", frameWaveShiftMm.toFixed(4));

            // Neuer Strahlvektor
            let winkelDiff = einfallsWinkel - brechungsWinkel;
            if (lsrel > 1) winkelDiff = -winkelDiff;
            if (winkelA.y1 > winkelA.y0) winkelDiff = -winkelDiff; // Unten trifft er an, also negieren
            // console.log("WinkelDiff (deg):", (winkelDiff * 180 / Math.PI).toFixed(2));
            const sinAlpha = Math.sin(winkelDiff);
            const cosAlpha = Math.cos(winkelDiff);
            const newDirX = rayVector.dirX * cosAlpha - rayVector.dirY * sinAlpha;
            const newDirY = rayVector.dirX * sinAlpha + rayVector.dirY * cosAlpha;

            // Update des Strahlvektors
            rayVector.currentXMm = hitInfo.hitX;
            rayVector.currentYMm = hitInfo.hitY;
            rayVector.dirX = newDirX;
            rayVector.dirY = newDirY;
            rayVector.currentMediumPermitivity = surface.relPermittivity; // Update des Mediums
            // Weiter mit dem nächsten Segment des Strahls oder "Leinwand" am Ende
        }
    }
    context.restore();
}

function drawSurfaces() {
    // Zeichnet die optischen Flächen
    opticalSurfaces.forEach(surface => {
        const x0 = surface.xFixed;
        const yu = surface.yMin;
        const yo = surface.yMax;
        const step = 1 / rasterMm; // Abstand der Punkte in Pixeln

        context.save();
        context.strokeStyle = (surface.relPermittivity > 1) ? 'green' : 'pink'; // grün
        context.lineWidth = 1;

        context.beginPath();
        for (let y = yu; y <= yo; y += step) {
            const x = x0 + calcSag(y, surface.focusRadius, surface.hyperK);

            const px = nullPxX + (x * pxPerMm);
            const py = nullPxY - (y * pxPerMm);
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

function drawBackground() {

    // Hintergrundfarbe
    context.save();
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();

    // Raaster X Vertikale Linien
    for (let x = 0; x <= canvas.width / pxPerMm; x += rasterMm) {
        drawLineMm(x, -canvas.height / pxPerMm, x, canvas.height / pxPerMm, 'slategray', 0.1);
    }
    // Raster Y Horizontale Linien
    for (let y = 0; y <= canvas.height / pxPerMm / 2; y += rasterMm) {
        drawLineMm(-canvas.width / pxPerMm, y, canvas.width / pxPerMm, y, 'slategray', 0.1);
        if (!y) continue; // y=0 schon gezeichnet
        drawLineMm(-canvas.width / pxPerMm, -y, canvas.width / pxPerMm, -y, 'slategray', 0.1);
    }

    // Emitter - Roten Kreis bei (0,0) mit 2mm Durchmesser zeichnen
    drawDotMm(0, 0, 'red', 1);
};

function drawInfoLabel() {
    context.save();
    // Dimensionen berechnen
    const widthMm = Math.round(canvas.width / pxPerMm);
    const heightMm = Math.round(canvas.height / pxPerMm);
    const label1 = `Fläche: ${widthMm}mm × ${heightMm}mm   Raster: ${rasterMm}mm`;
    const label2 = `Wellenlänge: ${waveLengthMm}mm (= ${Math.round(300 / waveLengthMm)}GHz)`;
    const label3 = `Modell(JS): ${usedModel} - Anmerkung: ${anmerkung}`;
    context.fillText(label1, 8, 6);
    context.fillText(label2, 8, 20);
    context.fillText(label3, 8, 34);
    context.restore();
}

window.addEventListener('resize', drawCanvas);
initSurfaceEditor();
let globalWaveShift = 0; // Globale Wellenverschiebung
function animate() {
    drawCanvas();
    requestAnimationFrame(animate);
    globalWaveShift += waveLengthMm / 30; // Geschwindigkeit der Wellenverschiebung
    if (globalWaveShift >= waveLengthMm) globalWaveShift -= waveLengthMm; // Korrektur
}
animate();


