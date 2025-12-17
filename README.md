[🇩🇪 Deutsche Version](README.md) | [🇺🇸 English Version](readme_en.md)

# Radaroptics Simulation 
(C) JoEmbedded.de

🚀 **[Live Demo](https://joembedded.github.io/radaroptics/)** - Direkt im Browser testen!

![Screenshot der Simulation](img/screen.png)
![Kohärente Fresnel Linse](img/fresnel.png)

## Überblick
- Visualisiert Brechung und Fokussierung von mm-Wellen-Radarstrahlen in 2D.
- Simuliert die Wirkung dielektrischer Linsen mit frei definierbaren Geometrien.
- Unterstützt iterative Linsenkonstruktion durch schnelle Anpassung der Parameter in `src/main.js`.
- Liefert RealWorld Ergebnisse für echte, 3D-druckbare Linsen!
- Komplette Integration in FreeCAD, Linsen lassen sich (fast) komplett automatisiert erzeugen 😄👍
- Kurzes Video dazu: https://youtu.be/QgKHenz11SE

## Was ist Radaroptik?
Moderne mm-Wellen-Radarchips besitzen häufig eine relativ breite Abstrahlkeule von 60 bis 90 Grad. Für Punkt- oder Distanzmessungen ist jedoch eine stärker fokussierte Keule besser geeignet. Bei Frequenzen um 60 GHz beträgt die Wellenlänge nur etwa 5 mm – groß genug, um dielektrische Linsen ähnlich wie in der optischen Abbildung zu verwenden, und gleichzeitig einfach herstellbar, zum Beispiel mittels 3D-Druck.

Für mm-Wellen gelten die grundlegenden Prinzipien der Wellenoptik:
- **Huygenssches Prinzip** – beschreibt die Ausbreitung von Wellenfronten
- **Fermatsches Prinzip** – beschreibt den Strahlverlauf als Weg minimaler optischer Länge
- **Snelliussches Brechungsgesetz** – beschreibt die Brechung und Reflexion an Grenzflächen unterschiedlicher dielektrischer bzw. optischer Materialien

Die Simulation zeigt, wie sich Radarstrahlen durch verschiedene Medien bewegen. Sie betrachtet ausschließlich die Hauptstrahlablenkung und bildet keine Nebenkeulen oder Mehrwegeeffekte ab. Für den Entwurf von Linsengeometrien reicht dieser vereinfachte Ansatz in der Praxis häufig aus.

> [!Note]
> Die Simulation zeigt nur Vektoren. Dadurch, dass die Radar-Wellenlänge im Verhältnis zu den geometrischen Dimensionen recht hoch ist, führt das in der Realität zu einer Unschärfe. Daraus ergeben sich folgende Randbedingungen:
> - Realistische Öffnungswinkel einfacher, "kleiner" Radar-Optiken von z. B. 30 mm liegen im Bereich von minimal ca. 10 - 15 °.
> - Aufgrund dieser begrenzten Öffnungswinkel spielt die bei Radarchips oft leichte Versetzung von RX- und TX-Antennen keine Rolle.
> - Die Antennen auf den Radarchips sind üblicherweise auf das Dielektrikum Luft abgestimmt. Eine zusätzliche dielektrische Antenne (z. B. eine Radarlinse) kann diese Anpassung stören, weshalb in der Praxis ein Abstand von etwa zwei Wellenlängen oder mehr ratsam ist.

In der Praxis findet man für die üblicherweise eingesetzten Materialien ABS, PLA, PETG und für 100%-Infill (für 3D-FDM-Druck) Dielektrizitätskonstanten $ε_r$ zwischen etwa 2.5 und 3.0 ([siehe './Docus/...'](./Docus/ChatGPT_DielektrischeEigenschaftenABS_PLA_PETG_60GHz.md)). Da die Brechung zu Luft die Wurzel $\sqrt{ε_r}$ ist, sind die Designs alle ähnlich und über leichte Variationen Distanz/Radius kann man leicht das Optimum finden. Sphärische Linsen (ohne asphärische Korrekturen) lassen sich am einfachsten drucken und sind daher immer ein guter Ausgangspunkt. "Unebenheiten" der Linse, die deutlich unter der Wellenlänge liegen, sind kein Problem.

Normalerweise sind die $ε_r$ für handelsübliches Material nicht bekannt. Eine grobe Messung ist möglich, indem ein Testblock des Materials in den Strahl einer Distanzmessung eingefügt wird. Dadurch misst der Sensor eine etwas größere Distanz. Diese, auf die Dicke des Testblocks bezogen, ergibt die relative Lichtgeschwindigkeit $c_r$ im Material und damit $ε_r = (c_r / c_0)^2$.
Für ein getestetes PLA-Material wurde so experimentell ein $ε_r$ von ca. 2.5 bestimmt.

> [!Important]
> "Echtes" 100%-Infill lässt sich nie erreichen. In kleinen Hohlräumen kann sich immer noch Wasser sammeln. Gedruckte Linsen sind i. d. R. nicht wirklich für den Außeneinsatz geeignet.

Presets für Typen:
- '0': plankonvexe, hyperbolische Linse mit planer Austrittsfläche
- '1': plankonvexe, (a-/)sphärische Linse mit planer Eintrittsfläche
- '2': plane, kohärente Fresnel-Linse

> [!Tip]
> - Der **Typ '0'** (mit planer Austrittsfläche) erreicht ideale asphärische Korrektur mit den Parametern (nach DIN ISO 10110-12):  
> $f_{sag}( y ) = \frac{ y^2 }{ focusRadius + \sqrt{focusRadius^2 - (1 + k) C^2 y^2}}$<br><br>
> für (wie im Beispiel Typ '0'):<br>
> $focusRadius = X_{fixed} * (\sqrt{ε_r} - 1)$ und  $hyperK = -ε_r$<br>
> ergibt sich als Optimum:<br>
> $X_{fixed} = 10 mm$ und $ε_r = 2.5$ : $focusRadius = 5.8 mm$ und $hyperK = -2.5$
>
> - **Typ '1'** (mit planer Eintrittsfläche) ist bereits als rein sphärische Linse leicht druckbar mit ausreichend guten Ergebnissen für erste Tests. In der Praxis liefert die asphärische Korrektur dann aber für Linsen kleineren Durchmessers nochmal deutliche Verbesserungen.
>
> - **Typ '2'** (kohärente Fresnel-Linse) ist zwar schön flach, aber Achtung: hier werden 2 oder mehr Wellenzüge überlagert, evtl. also etwas weniger exakt.

## Reale Ergebnisse

Eine reale Linse vom Typ '0' mit exzellenter Performance:
- hergestellt per CNC aus ABS Vollmaterial, damit voll Outdoor-tauglich
- Leichte Modifikationen gegenüber 3D-Druck: 
  - Focus wird zur Anpassung um +1mm verschoben.
  - Übergang an der inneren Ecke wurde mit Radius 1mm verrundet, damit einfacher zu fertigen.
  
> [!IMPORTANT]
> 📧⚙️🛠️ Anfragen für technische Kooperationen sind jederzeit gerne  willkommen!

![Eine reale Linse vom Typ '0'](img/HyperplanarABS_F10.jpg)



## Schnellstart/Modellauswahl
1. Entweder online oder Repo klonen bzw. herunterladen (für eigene Linsen in `src/main.js` die gewünschten Parameter (primär `useModel`, `waveLengthMm`) anpassen)
2. Zum Exportieren der Sagitta-Werte auf das Element klicken (🔗).
3. Für FreeCAD reicht eine Seite für einen Rotationskörper, daher wird nur die positive y-Seite exportiert.
4. Datei lokal speichern (Vorschlag: 'c:/temp/stuetz.dat').
5. FreeCAD starten und Macro `radarli_freecad_import` anlegen.
6. Neues Projekt öffnen und einen Körper darin anlegen, aber noch keinen Sketch.
7. Den Macro `radarli_freecad_import` ausführen und gegebenenfalls Konturen ergänzen.
8. Sketch zum 360° Drehkörper machen.
9. Und zack: *HAPPY PRINTING* (100% Infill nicht vergessen)

## Aufbau der Simulation
- **Emitter (rot):** Punktquelle am Ursprung, deren Abstrahlwinkel über `startAngleDeg`, `endAngleDeg` und `angleStep` gesteuert wird.
- **Optische Flächen:** In `opticalSurfaces` (in `src/main.js`) definierte Übergänge mit fixen X-Positionen (`xFixed`) und vertikalem Ausdehnungsbereich (`yMin`, `yMax`). Jede Fläche kann plan, konvex oder konkav sein.
- **Brechung:** Die relative Dielektrizitätskonstante (`relPermittivity`) wird für den Snellius-Effekt genutzt. `focusRadius` beschreibt die Krümmung (negativ = konvex, positiv = konkav, 0 = plan).
- **Asphärizität:** Über `hyperK` ('konische Konstante') kann die Fläche von sphärisch (0) hin zu paraboloid oder hyperbolisch (kleiner -1) verzerrt werden.

## Wichtige Parameter (Auszug)
| Parameter | Datei / Abschnitt | Bedeutung |
|-----------|-------------------|-----------|
| `pxPerMm` | `src/main.js` | Skalierung zwischen physikalischen Millimetern und Canvas-Pixeln. |
| `rasterMm` | `src/main.js` | Rasterabstand für das Hintergrundgitter. |
| `waveLengthMm` | `src/main.js` | Verwendete Radar-Wellenlänge (z. B. 5 mm bei 60 GHz). |
| `startAngleDeg`, `endAngleDeg`, `angleStep` | `drawRays()` | Öffnungswinkel und Auflösung der Abstrahlkeule. |
| `focusRadius` | `opticalSurfaces` | Krümmungsradius der Fläche; Vorzeichen bestimmt die Orientierung. |
| `relPermittivity` | `opticalSurfaces` | Relative Permittivität des Mediums hinter der Fläche. |
| `hyperK` | `opticalSurfaces` | Die 'konische Konstante' für sphärische (= 0), paraboloide (< 0) oder hyperbolische Flächen (i. d. R. negativer als -1) |

## 'Radarli'-Sensor
Die Vorlage entstand für den Low-Cost-Sensor "OSX Radar Distanz 60 GHz Type 470" (aka 'Radarli'). Weitere Dokumentation und PDFs stehen unter folgendem Link bereit:

<https://joembedded.de/x3/ltx_firmware/index.php?dir=./Open-SDI12-Blue-Sensors/0470_RadarDistA>

## Anmerkungen zur Berechnung

Es wird nur der gebeugte Wellenzug in Hauptrichtung betrachtet, keine Rückstreuung und keine Intensitätsverteilung. Die Berechnung entspricht aber exakt den physikalischen Gesetzen.Die ersten Ergebnisse aus dem 3D-Drucker ('Radarli') sind vielversprechend und stimmen sehr gut mit den erwarteten Werten überein.

*Viel Erfolg beim Design eigener Radaroptiken!* 😊🎯✨
<br>*Und, wie bereits erwähnt:* 📧⚙️🛠️ *Anfragen für technische Kooperationen sind jederzeit gerne  willkommen!*
