# Recherche von ChatGPT zum Thema:

# Dielektrische Eigenschaften von ABS, PLA und PETG bei 60 GHz

## Einleitung

Die Kenntnis der dielektrischen Eigenschaften von Kunststoffen ist im
Millimeterwellenbereich (mm-Wave) -- etwa bei 60 GHz -- von großer
Bedeutung. In dieser Frequenzlage werden Materialien z.B. für
Hochfrequenzantennen, Linsen oder Gehäuse in 5G- und WiGig-Anwendungen
eingesetzt. Die relative Permittivität (ε_r) beeinflusst die Wellenlänge
und Impedanz in einem Material, während ein geringer Verlustfaktor
(Verlusttangens tan δ) für minimale Dämpfung sorgt. 3D-gedruckte
Thermoplaste wie ABS, PLA und PETG sind aufgrund einfacher Formgebung
attraktiv, müssen jedoch eine möglichst konstante ε_r und geringe
Verluste bei 60 GHz aufweisen. Im Folgenden werden die Materialien hinsichtlich Permittivität und
Verlusten verglichen, und es wird auf Einflussfaktoren wie Frequenz,
Temperatur, Bauteildichte (Infill) und Prozessparameter eingegangen.

## Dielektrische Eigenschaften bei ~60 GHz

Tabelle 1 zeigt eine Gegenüberstellung der gemessenen relativen
Permittivität ε_r′ (Realteil) und Verlusttangens tan δ von ABS, PLA und
PETG im Frequenzbereich um 60 GHz. Die Werte stammen aus der
Fachliteratur und liegen für alle drei Kunststoffe in einer ähnlichen
Größenordnung. Generell weisen die untersuchten 3D-Druck-Materialien
eine ε_r′ von etwa 2,6--2,8 und sehr geringe Verluste (tan δ im
einstelligen Prozentbereich oder darunter) auf. Insbesondere PLA zeigt die höchste Permittivität mit ca. 2,72, während
PETG mit etwa 2,68 etwas niedriger liegt. ABS liegt im selben Bereich und wurde in unterschiedlichen Studien mit
ε_r′ ≈2,4--2,7 ermittelt. Die Verluste sind bei allen Materialien klein; beispielsweise wurden für
ABS tan δ ≈0,0055 (0,55 %) und für PLA ≈0,01 (1 %) gemessen. In W-Band-Messungen (75--110 GHz) blieben die Verlustbeiwerte ebenfalls
niedrig (imaginäres ε < 0,045, entsprechend tan δ < ~0,02).

**Tabelle 1: Vergleich der diel. Kenngrößen von ABS, PLA und PETG um 60 GHz.**  
Die Werte für ε_r′ (relative Permittivität, Realteil) und tan δ (Verlustfaktor) sind gerundete Richtwerte aus Literaturmessungen.

| Material | ε_r′ bei ~60 GHz | Verlusttangens tan δ bei ~60 GHz |
|----------|------------------|----------------------------------|
| **ABS** | ca. 2,6--2,7 | ~0,005--0,02 (0,5--2 %) |
| **PLA** | ca. 2,7--2,8 | ~0,01--0,02 (1--2 %) |
| **PETG** | ca. 2,6--2,7 | ~0,01--0,02 (1--2 %) |

*(Quellen: Messungen im Q-Band 30--50 GHz und W-Band 75--110 GHz; siehe Literatur)*

**Vergleich:** Alle drei Kunststoffe besitzen eine sehr ähnliche
Dielektrizitätskonstante um 60 GHz. Zum Vergleich: Teflon (PTFE) hat
ε_r′≈2,1 -- die hier betrachteten 3D-Druck-Materialien liegen also etwas höher,
aber immer noch im typischen Bereich gängiger Kunststoffe. Die minimalen
Unterschiede (PLA leicht höher, PETG am niedrigsten) sind auf die
jeweilige chemische Zusammensetzung zurückzuführen. PLA (Polylactid)
enthält polarere Gruppen (Ester), was zu etwas höherer ε_r beitragen
kann, während PETG (Polyethylenterephthalat-Glykol) geringfügig
niedriger liegt. ABS (Acrylnitril-Butadien-Styrol) rangiert dazwischen.

Hinsichtlich der Verluste zeigen alle Materialien bei 60 GHz eine
geringe dielektrische Dämpfung. PLA und PETG weisen typischerweise tan δ
um 1--2 % oder darunter auf, ABS wurde teils sogar mit <1 % Verlust gemessen. Diese Unterschiede sind relativ klein, so dass im mm-Wellen-Bereich
prinzipiell alle drei Materialien als niedrige Verlustkunststoffe gelten können.

## Einfluss der Frequenz

Die relative Permittivität der betrachteten Kunststoffe ändert sich im
Frequenzband von einigen GHz bis ~100 GHz nur geringfügig. Messreihen
in Q-Band (30--50 GHz) und W-Band (75--110 GHz) zeigen für PLA, ABS und
PETG praktisch konstante ε_r′-Werte über diesen Bereich. PLA wurde z.B. mit ε_r′≈2,72 bei 75--110 GHz gemessen, was gut mit ~2,7 bei 30--50 GHz übereinstimmt. Auch PETG und ABS zeigten keine ausgeprägte Dispersion in diesem Frequenzbereich. Allgemein nehmen bei polymeren Isolatoren die
Permittivität *etwas* mit steigender Frequenz ab, da Dipol-Relaxationen
bei sehr hohen Frequenzen nicht mehr folgen können. Allerdings liegen
60 GHz für diese Materialien noch unterhalb etwaiger starken molekularen
Resonanzen, so dass ε_r′ weitgehend konstant bleibt. Ein leichtes
Absinken der gemessenen ε_r bei Erhöhung von z.B. 1 GHz auf 60 GHz ist
möglich, aber im Bereich weniger
Prozent.
Umgekehrt steigt die Permittivität zu niedrigeren Frequenzen hin etwas
an (durch statische Dipolorientierung). Dieser Effekt ist hier
vernachlässigbar klein. Auch der Verlustfaktor tan δ kann eine
Frequenzabhängigkeit zeigen -- oft nimmt tan δ bei vielen Polymeren
jenseits einiger MHz zunächst zu, erreicht ein Maximum nahe einer
Relaxationsfrequenz und fällt dann wieder ab. Bei 60 GHz liegen ABS,
PLA, PETG jedoch in einem Frequenzbereich, in dem die Verlustkurve
relativ flach ist. Messungen ergaben keine signifikante Zunahme der
Verluste zwischen 30 GHz und
110 GHz.
Somit kann festgehalten werden, dass im Umfeld von 60 GHz die
Materialkonstanten dieser Thermoplaste praktisch frequenzunabhängig
sind.

## Einfluss der Temperatur

Die dielektrischen Eigenschaften von Kunststoffen hängen deutlich von
der Temperatur ab. Im Allgemeinen führt eine Temperaturerhöhung zu
höherer molekularer Mobilität in polymeren Materialien. Befinden sich
polare Gruppen im Polymer, können sich diese mit steigender Temperatur
freier ausrichten, was die effektive Permittivität etwas ansteigen lassen kann. Gleichzeitig nehmen die dielektrischen Verluste typischerweise zu, da
thermisch angeregte Dipolbewegungen und Leitungsbeiträge (z.B. durch
thermisch aktivierte Ladungsträger) erhöht werden. Beispielsweise wurde für Polymer-Verbundwerkstoffe beobachtet, dass
sowohl ε_r als auch tan δ mit steigender Temperatur merklich
anwachsen.
Im Fall von ABS, PLA und PETG ist zu beachten, dass diese Materialien
relativ niedrige Glasübergangstemperaturen T_g haben (PLA ca. 60 °C,
PETG ~70 °C, ABS ~105 °C). **Unterhalb** T_g sind die Polymere im
gläsernen Zustand, in dem nur begrenzte Dipolbewegung möglich ist -- die
Verluste sind dann gering. **Oberhalb** T_g gehen sie in einen
gummiartigen Zustand über, was die Verluste stark erhöhen kann. Daher
ist im hochfrequenten Betrieb eine Erwärmung unerwünscht: Im schlimmsten
Fall könnten PLA-Teile bei 60 GHz und erhöhter Leistungsdichte durch die
dielektrische Erwärmung ihren T_g erreichen und dann sprunghaft mehr
Verluste zeigen (und mechanisch erweichen). Für Anwendungen ist also
sicherzustellen, dass die Einsatztemperatur deutlich unterhalb der
Glasübergangstemp. liegt. Insgesamt lässt sich sagen: moderate
Temperatursteigerungen (z.B. 20 °C auf 50 °C) bewirken *leichte*
Erhöhung von ε_r und tan δ, während das Überschreiten von ca. 60--70 °C
(v.a. bei PLA) zu einem starken Anstieg der Verluste führen kann. Eine
Temperaturstabilisierung der Bauteile ist daher wichtig, um konstante
dielektrische Eigenschaften bei 60 GHz zu gewährleisten.

## Einfluss von Infill-Dichte und interner Struktur

FDM-3D-Drucker erlauben es, Bauteile mit unterschiedlich gefüllten
Innenstrukturen (Infill) herzustellen. Die effektive Permittivität eines
gedruckten Bauteils hängt wesentlich vom Füllgrad (Dichte) ab, da
Lufteinschlüsse einen ε_r von ~1 beitragen. Eine höhere Infill-Dichte
(mehr Materialanteil) erhöht daher die gemessene relative Permittivität,
während ein geringerer Füllgrad ε_r absenkt. In einer Studie wurden
PLA-Proben mit verschiedenen Infill-Einstellungen gedruckt: Die
effektive ε_r reichte von etwa 1,78 (sehr geringer Infill) bis 2,81
(voller
Infill).
Ähnlich stieg bei ABS der Wert von ca. 2,20 auf 2,99 in Abhängigkeit von
der
Füllrate.
Diese große Spannweite zeigt, dass Luftporen und Hohlräume den
effektiven Dielektrizitätswert stark reduzieren können. Für
reproduzierbare und hohe ε_r′ sollte daher möglichst *vollständig*
gedruckt werden (100 % Infill bzw. solide Innenstruktur). Neben der
Dichte spielt auch das Infill-Muster (Raster, Waben, etc.) eine Rolle:
Bei anisotropen Mustern kann die effektive Permittivität
richtungsabhängig werden. Die Anisotropie in 3D-gedruckten
PLA-Strukturen wurde z.B. von Felício et al. beobachtet, wobei
Unterschiede in ε_r gemessen wurden je nach Ausbreitungsrichtung relativ
zur Druckrichtung. Für praktische Anwendungen bedeutet dies, dass die
Orientierung des Bauteils im Drucker die HF-Eigenschaften beeinflussen
kann. Gleichmäßige, isotrope Füllmuster sind vorteilhaft, um
Richtungsabhängigkeiten zu minimieren.

Weiterhin beeinflusst die interne Schichthaftung und eventuelle
Mikrorisse oder Lufteinschlüsse die Verluste. Ein gut gedrucktes,
dichtes Bauteil wird weniger Verlust zeigen. Experimente haben gezeigt,
dass eine Erhöhung der Infill-Dichte nicht nur ε_r steigert, sondern
auch die gemessene AC-Leitfähigkeit etwas
erhöht
-- was auf leicht höhere Verluste hindeutet, da mehr Material (mit
seinen dielektrischen Verlusten) pro Volumen vorhanden ist. Trotzdem
überwiegt der Vorteil einer homogenen Füllung: Ein 50 %-gefülltes Teil
hätte nicht nur geringere ε_r, sondern potenziell auch Streuverluste
durch Inhomogenitäten. Insgesamt sollte für HF-Bauteile ein hoher Infill
gewählt und die Prozessparameter so optimiert werden, dass
Lufteinschlüsse minimiert werden.

## Einfluss von Druckprozess und Materialeigenschaften

Neben Infill spielen weitere Prozessparameter des FFF-Drucks (Fused
Filament Fabrication) eine Rolle.

**Drucktemperatur und -geschwindigkeit:** Eine zu niedrige Extrudertemperatur oder zu hohe
Druckgeschwindigkeit kann zu schlechtem Zusammenhalt der Filamentbahnen
führen, was Mikrolücken verursacht. Diese reduzieren die effektive
Permittivität und können Verluste durch Streuung erhöhen. Optimal
eingestellte Druckparameter hingegen ergeben eine dichtere Struktur.
Studien zeigen, dass z.B. eine moderate Druckgeschwindigkeit (ca.
30 mm/s) und ausreichende Extrusionstemperatur (z.B. 215 °C für PLA) die
besten dielektrischen Ergebnisse liefern, indem sie die Porosität
minimieren.

**Schichthöhe:** Eine geringere Layerhöhe (feinere Schichten) verbessert
in der Regel die Detailtreue und verringert die Porengröße zwischen den
Bahnen. Dadurch kann die effektive Permittivität etwas steigen.
Allerdings wurde berichtet, dass der Infill-Anteil einen deutlich
größeren Einfluss hat als die
Schichthöhe.
Dennoch ist für HF-Anwendungen eine feine Schichtauflösung ratsam, um
eine möglichst homogene Struktur zu erzielen.

**Materialmodifikationen:** Additive im Filament (etwa Farbpigmente,
Füllstoffe) können die dielektrischen Eigenschaften verändern.
Beispielsweise wurden PLA-Filamente in verschiedenen Farben getestet --
metallisch pigmentierte Sorten zeigten einen höheren Verlustfaktor und
stärkere frequenzabhängige Verluste als naturbelassene
PLA-Proben.
Dies legt nahe, dass metallische oder leitfähige Partikel im Material
die HF-Verluste erhöhen. Reinheit des Materials ist deshalb wichtig: Ein
reines (ungefülltes) Polymer wie standard-PLA oder -ABS hat die
geringsten Verluste, während mit leitfähigen Partikeln versetzte
Filamente (z.B. für ESD-sichere ABS, CFK-verstärkte oder metallisch
glänzende Typen) höhere tan δ aufweisen können. Für minimale Verluste
bei 60 GHz sollten daher unveränderte, nicht leitend gefüllte Filamente
verwendet werden, sofern mechanisch möglich.

Zusammenfassend lässt sich sagen, dass der Druckprozess optimiert werden
muss, um die gewünschten dielektrischen Eigenschaften zu erreichen. Hohe
Dichte (100 % Infill), geeignete Drucktemperaturen für gute
Layerhaftung, geringe Schichthöhe und der Verzicht auf verluststeigernde
Füllstoffe ergeben Bauteile mit höherer ε_r und niedrigerem tan δ. Jede
Inhomogenität im Druckteil wirkt wie ein Streuzentrum und Luftspalt und
verschlechtert die HF-Eigenschaften.

## Fazit: Eignung der Materialien bei 60 GHz

**ABS, PLA und PETG** erweisen sich grundsätzlich alle als geeignet für
Anwendungen im 60 GHz-Bereich, *wenn* sie korrekt verarbeitet werden.
Ihre dielektrische Konstanten liegen mit ~2,7 nah beieinander, wodurch
alle drei Materialien die Ausbreitung elektromagnetischer Wellen in
ähnlicher Weise beeinflussen. Der geringe Verlustfaktor (typ. unter 0,01 bei 60 GHz) bedeutet, dass
diese Kunststoffe nur eine geringe Dämpfung
verursachen.
Im Vergleich bietet ABS tendenziell die geringsten Verluste in einigen
Untersuchungen -- dies kann ABS etwas vorteilhafter für hochfrequente
Anwendungen machen, sofern die Verarbeitung (warme Druckumgebung,
Nachschrumpfen) beherrschbar ist. PLA lässt sich am einfachsten drucken
und hat eine stabile ε_r, jedoch ist sein Einsatztemperaturbereich durch
den niedrigen T_g begrenzt (PLA-Teile dürfen sich nicht zu stark
erwärmen). PETG stellt einen guten Kompromiss dar: es ist drucktechnisch
einfacher als ABS (benötigt kein vollständig geschlossenes Heizbett),
verträgt aber höhere Temperaturen als PLA und zeigt ebenfalls geringe
Verluste.

In der Praxis entscheidet neben den rein dielektrischen Kennwerten auch
die mechanische und thermische Belastbarkeit: Für 60 GHz-Radome oder
Antennenträger, die evtl. Sonneneinstrahlung ausgesetzt sind, könnte PLA
aufgrund möglicher Verformung bei Wärme weniger geeignet sein, obwohl
seine dielektrischen Eigenschaften einwandfrei sind. ABS und PETG sind
in solchen Fällen temperaturbeständiger. Aus HF-Sicht sind jedoch alle
drei Materialien bei 60 GHz nutzbar, da keine Resonanzen oder überhöhten
Verluste im mm-Wellenband auftreten. Die Materialwahl kann sich daher an
anderen Kriterien orientieren (Druckbarkeit, Steifigkeit,
Umweltbedingungen), ohne die Hochfrequenz-Performance zu
kompromittieren. Wichtig ist in allen Fällen eine hochwertige
Druckqualität (vollständiger Infill, keine Lufteinschlüsse) und ggf.
eine Charakterisierung der gefertigten Teile, um die Annahmen über ε_r
und tan δ zu verifizieren.

## Literaturverzeichnis

1. **Gregory, N.** (2022): *Measuring the Electrical Properties of 3D Printed Plastics in the W-Band*. Bachelorarbeit, University of Arkansas. <https://scholarworks.uark.edu/eleguht/85/>

2. **Reyes, N.**, Casado, F., Tapia, V., Jarufe, C., Finger, R., Bronfman, L. (2018): *Complex dielectric permittivity of engineering and 3D-printing polymers at Q-band*. **Journal of Infrared, Millimeter, and Terahertz Waves, 39**(11), S. 1140--1147. <https://research.tue.nl/files/118515719/Complex_Dielectric_Permittivity_of_common_Engineering.pdf>

3. **Kuzmanić, I.**, Vujović, I., Petković, M., Šoda, J., et al. (2023): *Influence of 3D printing properties on relative dielectric constant in PLA and ABS materials*. **Progress in Additive Manufacturing, 8**, S. 703--710. <https://link.springer.com/article/10.1007/s40964-023-00411-0>

4. **Tang, Y.**, Zhang, P., Huang, L., et al. (2019): *Temperature Effects on the Dielectric Properties and Breakdown Performance of h-BN/Epoxy Composites*. **Materials, 12**(24), Art. 4112. <https://www.mdpi.com/1996-1944/12/24/4112>

5. **MDPI** (2023): *How Do 3D Printing Parameters Affect the Dielectric and Mechanical Performance of Polylactic Acid--Cellulose Acetate Polymer Blends?* <https://www.mdpi.com/2504-477X/7/12/492>

6. **PSE Community** (2023): *Evaluation of Relative Permittivity and Loss Factor of 3D Printing Materials for Use in RF Electronic Applications*. <https://psecommunity.org/wp-content/plugins/wpor/includes/file/2302/LAPSE-2023.1893-1v1.pdf>
