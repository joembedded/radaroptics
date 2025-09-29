# Radaroptics Simulation 
(C) JoEmbedded.de

🚀 **[Live Demo](https://joembedded.github.io/radaroptics/)** - Direkt im Browser testen!

![Screenshot der Simulation](img/screen.png)

## Ueberblick
- Visualisiert Brechung und Fokussierung von mm-Wellen-Radarstrahlen in 2D.
- Simuliert die Wirkung dielektrischer Linsen mit frei definierbaren Geometrien.
- Unterstuetzt iterative Linsenkonstruktion durch schnelle Anpassung der Parameter in `src/main.js`.
- Liefert RealWorld Ergebnisse! Für echte Linsen!

## Was ist Radaroptik?
Moderne mm-Wellen-Radarchips (z.B. ACCONEER A121) besitzen oft eine relativ breite Abstrahlkeule mit 60 bis 90 Grad. Fuer Punkt- oder Distanzmessungen ist eine fokussierte Keule jedoch deutlich praeziser. In Bereichen um 60 GHz betraegt die Wellenlaenge nur noch ca. 5 mm - gross genug, um dielektrische Linsen wie klassische Optiken zu verwenden und dennoch deutlich einfacher zu fertigen als optische Linsen, z.B. mit einem einfachen 3D-Drucker.

Die Simulation zeigt, wie sich Radarstrahlen durch verschiedene Medien bewegen. Sie betrachtet ausschliesslich die Hauptstrahlablenkung und bildet keine Nebenkeulen oder Mehrwegeeffekte ab. Fuer den Entwurf von Linsengeometrien reicht dieser vereinfachte Ansatz in der Praxis haeufig aus.
Die Linse aus dem Beispiel wurde als plankonvexe, hyperbolische Linse designed, deren Vorteil ist, dass sie eine plane Oberfläche besitzt.

## Schnellstart
1. Repository klonen oder herunterladen.
2. `index.html` in einem aktuellen Browser oeffnen (lokal, kein Build-Schritt noetig).
3. In `src/main.js` die gewuenschten Parameter anpassen.
4. Seite im Browser neu laden, um Aenderungen zu sehen.

## Aufbau der Simulation
- **Emitter (rot):** Punktquelle am Ursprung, deren Abstrahlwinkel ueber `startAngleDeg`, `endAngleDeg` und `angleStep` gesteuert wird.
- **Optische Flaechen:** In `opticalSurfaces` definierte Uebergaenge mit fixen X-Positionen (`xFixed`) und vertikalem Ausdehnungsbereich (`yMin`, `yMax`). Jede Flaeche kann plan, konvex oder konkav sein.
- **Brechung:** Die relative Dielektrizitaetskonstante (`relPermittivity`) wird fuer den Snellius-Effekt genutzt. `focusRadius` beschreibt die Kruemmung (negativ = konvex, positiv = konkav, 0 = plan).
- **Asphaerizitaet:** Ueber `hyperK` kann die Flaeche von sphaerisch (0) hin zu paraboloid oder hyperbolisch (kleiner -1) verzerrt werden.
- **Detektorflaeche:** Eine entfernte Flaeche am Ende des Arrays dient als "Leinwand" fuer austretende Strahlen.

## Wichtige Parameter (Auszug)
| Parameter | Datei / Abschnitt | Bedeutung |
|-----------|-------------------|-----------|
| `pxPerMm` | `src/main.js` | Skalierung zwischen physikalischen Millimetern und Canvas-Pixeln. |
| `rasterMm` | `src/main.js` | Rasterabstand fuer das Hintergrundgitter. |
| `waveLengthMm` | `src/main.js` | Gebrauchte Radar-Wellenlaenge (z.B. 5 mm bei 60 GHz). |
| `startAngleDeg`, `endAngleDeg`, `angleStep` | `drawRays()` | Oeffnungswinkel und Aufloesung der Abstrahlkeule. |
| `focusRadius` | `opticalSurfaces` | Kruemmungsradius der Flaeche; Vorzeichen bestimmt die Orientierung. |
| `relPermittivity` | `opticalSurfaces` | Relative Permittivitaet des Mediums hinter der Flaeche. |
| `hyperK` | `opticalSurfaces` | Formfaktor fuer sphaerische, paraboloide oder hyperbolische Flaechen. |

## Linsenmaterialien
ABS laesst sich im SLA- oder FDM-Druck unkompliziert verarbeiten und besitzt bei 60 GHz typischerweise eine relative Permittivitaet von ca. 3. In Kombination mit einem leicht hyperbolischen Profil (`hyperK ~ -2.7`) liefert die Simulation fuer den im Projekt hinterlegten Radar-Sensor gute Ergebnisse. Andere Materialien (z.B. PETG, PTFE) koennen ueber ihre jeweiligen Permittivitaeten eingebunden werden.

## 'Radarli'-Sensor
Die Vorlage entstand fuer den Low-Cost-Sensor "OSX Radar Distanz 60 GHz Type 470" (aka 'Radarli'). Weitere Dokumentation und PDFs stehen unter folgendem Link bereit:

<https://joembedded.de/x3/ltx_firmware/index.php?dir=./Open-SDI12-Blue-Sensors/0470_RadarDistA>

## Weiterentwicklung
- Zusaetzliche optische Flaechen (z.B. Fenster oder Radome) im `opticalSurfaces`-Array ergaenzen.
- Totalreflexion oder Streuverluste visualisieren (siehe Kommentare in `findHitToSurface`).
- Export der berechneten SAG()-Funktion (SAG: 'Sagitta': Bogenfunktion der Linse) im Klartext.

Viel Erfolg beim Design eigener Radaroptiken!
