/*jslint indent: 4, maxerr: 50, regexp: true */
/*global $, Smooth, Calculation, CalculationNumber, CalculationPage, alert, console, document, window*/

$(function () {

    'use strict';

    // vars
    var i,
        optionBrixPlato,
        optionSpindelKorrekturSW,
        optionSpindelKorrekturRE,
        //                       0 °P,  1 °P,  1 °P,  2 °P,  3 °P,  4 °P,  5 °P,  6 °P,  7 °P,  8 °P,  9 °P, 11 °P, 12 °P, 13 °P, 14 °P, 15 °P, 16 °P, 17 °P, 18 °P, 19 °P, 20 °P, 21 °P, 22 °P, 23 °P, 24 °P, 25 °P, 26 °P, 27 °P, 28 °P, 29 °P
        smooth05C = new Smooth([-0.48,  0.51,  1.49,  2.48,  3.46,  4.43,  5.41,  6.38,  7.35,  8.33,  9.30, 10.28, 11.27, 12.26, 13.25, 14.25, 15.25, 16.25, 17.25, 18.24, 19.24, 20.22, 21.20, 22.17, 23.14, 24.12, 25.10, 26.10, 27.10, 28.10], {scaleTo: [0, 29]}),
        smooth10C = new Smooth([-0.38,  0.60,  1.59,  2.58,  3.57,  4.56,  5.54,  6.53,  7.52,  8.51,  9.50, 10.49, 11.48, 12.48, 13.47, 14.47, 15.46, 16.46, 17.46, 18.45, 19.44, 20.43, 21.42, 22.40, 23.39, 24.38, 25.37, 26.37, 27.36, 28.36], {scaleTo: [0, 29]}),
        smooth15C = new Smooth([-0.23,  0.77,  1.76,  2.76,  3.75,  4.75,  5.74,  6.74,  7.73,  8.73,  9.73, 10.73, 11.72, 12.72, 13.72, 14.72, 15.71, 16.71, 17.71, 18.70, 19.70, 20.69, 21.68, 22.68, 23.67, 24.67, 25.67, 26.67, 27.66, 28.66], {scaleTo: [0, 29]}),
        smooth20C = new Smooth([ 0.00,  1.00,  2.00,  3.00,  4.00,  5.00,  6.00,  7.00,  8.00,  9.00, 10.00, 11.00, 12.00, 13.00, 14.00, 15.00, 16.00, 17.00, 18.00, 19.00, 20.00, 21.00, 22.00, 23.00, 24.00, 25.00, 26.00, 27.00, 28.00, 29.00], {scaleTo: [0, 29]}),
        smooth25C = new Smooth([ 0.29,  1.30,  2.30,  3.31,  4.31,  5.31,  6.31,  7.31,  8.31,  9.31, 10.32, 11.32, 12.32, 13.32, 14.33, 15.33, 16.33, 17.34, 18.34, 19.35, 20.35, 21.36, 22.36, 23.36, 24.36, 25.36, 26.37, 27.37, 28.38, 29.38], {scaleTo: [0, 29]}),
        smooth30C = new Smooth([ 0.66,  1.67,  2.67,  3.68,  4.68,  5.68,  6.68,  7.68,  8.68,  9.68, 10.68, 11.69, 12.69, 13.70, 14.70, 15.71, 16.71, 17.72, 18.73, 19.74, 20.75, 21.76, 22.76, 23.76, 24.76, 25.77, 26.77, 27.78, 28.79, 29.79], {scaleTo: [0, 29]}),
        smooth35C = new Smooth([ 1.09,  2.09,  3.09,  4.09,  5.09,  6.09,  7.10,  8.10,  9.10, 10.11, 11.11, 12.12, 13.13, 14.13, 15.14, 16.14, 17.15, 18.16, 19.17, 20.18, 21.19, 22.20, 23.20, 24.21, 25.21, 26.21, 27.22, 28.22, 29.23, 30.24], {scaleTo: [0, 29]}),
        smooth40C = new Smooth([ 1.56,  2.56,  3.56,  4.56,  5.56,  6.57,  7.57,  8.57,  9.58, 10.59, 11.60, 12.60, 13.61, 14.62, 15.62, 16.62, 17.63, 18.64, 19.65, 20.66, 21.68, 22.68, 23.68, 24.69, 25.69, 26.69, 27.69, 28.70, 29.70, 30.71], {scaleTo: [0, 29]}),
        smooth45C = new Smooth([ 2.09,  3.09,  4.10,  5.10,  6.10,  7.10,  8.11,  9.11, 10.11, 11.12, 12.12, 13.13, 14.13, 15.13, 16.14, 17.14, 18.15, 19.15, 20.16, 21.18, 22.19, 23.20, 24.20, 25.21, 26.20, 27.20, 28.20, 29.20, 30.21, 31.21], {scaleTo: [0, 29]}),
        smooth50C = new Smooth([ 2.67,  3.68,  4.68,  5.68,  6.69,  7.69,  8.69,  9.69, 10.69, 11.69, 12.69, 13.69, 14.69, 15.69, 16.69, 17.70, 18.71, 19.72, 20.73, 21.74, 22.75, 23.75, 24.76, 25.75, 26.75, 27.74, 28.74, 29.74, 30.75, 31.76], {scaleTo: [0, 29]}),
        smooth55C = new Smooth([ 3.29,  4.29,  5.29,  6.29,  7.29,  8.29,  9.29, 10.29, 11.29, 12.30, 13.30, 14.31, 15.31, 16.31, 17.31, 18.31, 19.32, 20.33, 21.33, 22.34, 23.35, 24.35, 25.34, 26.33, 27.33, 28.32, 29.32, 30.32, 31.32, 32.33], {scaleTo: [0, 29]}),
        smooth60C = new Smooth([ 3.94,  4.94,  5.94,  6.93,  7.93,  8.93,  9.93, 10.93, 11.94, 12.95, 13.96, 14.96, 15.96, 16.96, 17.96, 18.96, 19.96, 20.96, 21.97, 22.97, 23.97, 24.96, 25.95, 26.94, 27.93, 28.92, 29.92, 30.92, 31.93, 32.93], {scaleTo: [0, 29]}),
        smooth65C = new Smooth([ 4.63,  5.63,  6.62,  7.62,  8.61,  9.61, 10.61, 11.61, 12.62, 13.62, 14.62, 15.62, 16.62, 17.61, 18.61, 19.61, 20.61, 21.61, 22.61, 23.61, 24.61, 25.60, 26.58, 27.57, 28.53, 29.55, 30.54, 31.54, 32.54, 33.54], {scaleTo: [0, 29]}),
        smooth70C = new Smooth([ 5.36,  6.35,  7.34,  8.34,  9.33, 10.33, 11.32, 12.32, 13.32, 14.32, 15.31, 16.31, 17.30, 18.29, 19.29, 20.28, 21.28, 22.28, 23.28, 24.27, 25.27, 26.25, 27.24, 28.22, 29.21, 30.19, 31.19, 32.18, 33.18, 34.17], {scaleTo: [0, 29]}),
        smooth75C = new Smooth([ 6.12,  7.11,  8.10,  9.09, 10.08, 11.07, 12.07, 13.06, 14.06, 15.05, 16.04, 17.03, 18.02, 19.01, 19.99, 20.99, 21.98, 22.98, 23.97, 24.97, 25.96, 26.94, 27.92, 28.90, 29.88, 30.86, 31.85, 32.84, 33.84, 34.83], {scaleTo: [0, 29]}),
        smooth80C = new Smooth([ 6.91,  7.89,  8.88,  9.87, 10.86, 11.85, 12.85, 13.84, 14.83, 15.82, 16.80, 17.78, 18.76, 19.74, 20.73, 21.72, 22.71, 23.70, 24.70, 25.68, 26.67, 27.64, 28.62, 29.59, 30.57, 31.55, 32.54, 33.53, 34.52, 35.51], {scaleTo: [0, 29]}),
        smooth85C = new Smooth([ 7.74,  8.82,  9.70, 10.68, 11.67, 12.66, 13.64, 14.63, 15.61, 16.60, 17.58, 18.55, 19.53, 20.51, 21.49, 22.47, 23.46, 24.44, 25.43, 26.41, 27.39, 28.36, 29.33, 30.30, 31.28, 32.26, 33.25, 34.23, 35.22, 36.20], {scaleTo: [0, 29]}),
        smooth90C = new Smooth([ 8.59,  9.56, 10.54, 11.52, 12.50, 13.48, 14.46, 15.45, 16.42, 17.40, 18.38, 19.35, 20.33, 21.30, 22.27, 23.24, 24.22, 25.19, 26.17, 27.15, 28.13, 29.10, 30.70, 31.04, 32.02, 32.99, 33.97, 34.96, 35.94, 36.92], {scaleTo: [0, 29]}),
        smooth95C = new Smooth([ 9.46, 10.43, 11.41, 12.38, 13.36, 14.34, 15.31, 16.29, 17.26, 18.23, 19.21, 20.17, 21.14, 22.10, 23.06, 24.02, 24.99, 25.96, 26.94, 27.91, 28.89, 29.86, 30.83, 31.80, 32.77, 33.74, 34.72, 35.70, 36.68, 37.65], {scaleTo: [0, 29]}),
        smoothCP = function (c, p) {
            var s = new Smooth([smooth05C(p), smooth10C(p), smooth15C(p), smooth20C(p), smooth25C(p), smooth30C(p), smooth35C(p), smooth40C(p), smooth45C(p), smooth50C(p), smooth55C(p), smooth60C(p), smooth65C(p), smooth70C(p), smooth75C(p), smooth80C(p), smooth85C(p), smooth90C(p), smooth95C(p)], {scaleTo: [5, 95]});
            return s(c);
        },
        smoothKohlensaeureSaettigung = new Smooth([3.20, 3.00, 2.80, 2.60, 2.45, 2.30, 2.15, 2.00, 1.90, 1.75, 1.65, 1.60], {scaleTo: 22}),
        // Einheiten Auswahl
        einheitenAuswahl = '<select id="einheitenAuswahl">' +
            '<option>Auswählen...</option>' +
            '<option value="' + String(1 / 0.0689475729) + '">Bar (bar) &rArr; Pound-force per square inch (psi)</option>' +
            '<option value="C2F">Celsius (°C) &rArr; Fahrenheit (°F)</option>' +
            '<option value="C2K">Celsius (°C) &rArr; Kelvin (°F)</option>' +
            '<option value="' + String(0.001771845195312500) + '">dram (dr.) &rArr; Kilogramm (kg)</option>' +
            '<option value="F2C">Fahrenheit (°F) &rArr; Celsius (°C)</option>' +
            '<option value="' + String(4.54609 / 16) + '">Imperial cup (Imp.cup) &rArr; Liter (l)</option>' +
            '<option value="' + String(4.54609 / 160) + '">Imperial fluid ounce (Imp.fl.oz.) &rArr; Liter (l)</option>' +
            '<option value="' + String(4.54609) + '">Imperial gallon (Imp.gal.) &rArr; Liter (l)</option>' +
            '<option value="' + String(4.54609 / 32) + '">Imperial gill (Imp.gi.) &rArr; Liter (l)</option>' +
            '<option value="' + String(4.54609 / 8) + '">Imperial pint (Imp.pt.) &rArr; Liter (l)</option>' +
            '<option value="' + String(4.54609 / 4) + '">Imperial quart (Imp.qt.) &rArr; Liter (l)</option>' +
            '<option value="K2C">Kelvin (K) &rArr; Celsius (°C)</option>' +
            '<option value="' + String(1 / 0.001771845195312500) + '">Kilogramm (kg) &rArr; dram (dr.)</option>' +
            '<option value="' + String(1 / 0.028349523125) + '">Kilogramm (kg) &rArr; ounce/lid (oz.)</option>' +
            '<option value="' + String(1 / 0.453592370) + '">Kilogramm (kg) &rArr; pound (lb./pd.)</option>' +
            '<option value="' + String(16 / 4.54609) + '">Liter (l) &rArr; Imperial cup (Imp.cup)</option>' +
            '<option value="' + String(160 / 4.54609) + '">Liter (l) &rArr; Imperial fluid ounce (Imp.fl.oz.)</option>' +
            '<option value="' + String(4.54609) + '">Liter (l) &rArr; Imperial gallon (Imp.gal.)</option>' +
            '<option value="' + String(32 / 4.54609) + '">Liter (l) &rArr; Imperial gill (Imp.gi.)</option>' +
            '<option value="' + String(8 / 4.54609) + '">Liter (l) &rArr; Imperial pint (Imp.pt.)</option>' +
            '<option value="' + String(4 / 4.54609) + '">Liter (l) &rArr; Imperial quart (Imp.qt.)</option>' +
            '<option value="' + String(16 / 3.785411784) + '">Liter (l) &rArr; US cup (US.cup)</option>' +
            '<option value="' + String(128 / 3.785411784) + '">Liter (l) &rArr; US fluid ounce (US.fl.oz.)</option>' +
            '<option value="' + String(3.785411784) + '">Liter (l) &rArr; US gallon (US.gal.)</option>' +
            '<option value="' + String(32 / 3.785411784) + '">Liter (l) &rArr; US gill (US.gi.)</option>' +
            '<option value="' + String(8 / 3.785411784) + '">Liter (l) &rArr; US pint (US.pt.)</option>' +
            '<option value="' + String(4 / 3.785411784) + '">Liter (l) &rArr; US quart (US.qt.)</option>' +
            '<option value="' + String(0.028349523125) + '">ounce/lid (oz.) &rArr; Kilogramm (kg)</option>' +
            '<option value="P2SG">Plato (°P) &rArr; Specific gravity (SG)</option>' +
            '<option value="' + String(0.453592370) + '">pound (lb./pd.) &rArr; Kilogramm (kg)</option>' +
            '<option value="' + String(0.0689475729) + '">Pound-force per square inch (psi) &rArr; Bar (bar)</option>' +
            '<option value="SG2P">Specific gravity (SG) &rArr; Plato (°P)</option>' +
            '<option value="' + String(3.785411784 / 16) + '">US cup (US.cup) &rArr; Liter (l)</option>' +
            '<option value="' + String(3.785411784 / 128) + '">US fluid ounce (US.fl.oz.) &rArr; Liter (l)</option>' +
            '<option value="' + String(3.785411784) + '">US gallon (US.gal.) &rArr; Liter (l)</option>' +
            '<option value="' + String(3.785411784 / 32) + '">US gill (US.gi.) &rArr; Liter (l)</option>' +
            '<option value="' + String(3.785411784 / 8) + '">US pint (US.pt.) &rArr; Liter (l)</option>' +
            '<option value="' + String(3.785411784 / 4) + '">US quart (US.qt.) &rArr; Liter (l)</option>' +
            '</select>',
        //numbers
        calculationNumberList = [],
		stammwuerzeBrix = new CalculationNumber(),
		restextraktBrix = new CalculationNumber(),
        brixPlatoVerhaeltnis = new CalculationNumber(),
        stammwuerzePlatoVorKorrektur = new CalculationNumber(),
		stammwuerzeTemperatur = new CalculationNumber(),
		stammwuerzePlato = new CalculationNumber(),
		restextraktPlatoVorKorrektur = new CalculationNumber(),
        restextraktTemperatur = new CalculationNumber(),
		restextraktPlato = new CalculationNumber(),
		restextraktTatsaechlich = new CalculationNumber(),
        dichteBier = new CalculationNumber(),
        dichteJungbier = new CalculationNumber(),
        alkoholgehaltGewicht = new CalculationNumber(),
		alkoholgehaltVolumen = new CalculationNumber(),
        evgScheinbar = new CalculationNumber(),
        evgTatsaechlich = new CalculationNumber(),
        brennwertVolumen = new CalculationNumber(),
        brennwertKalorien = new CalculationNumber(),
        brennwertJoule = new CalculationNumber(),
        rezensWunsch = new CalculationNumber(),
        gaerTemperatur = new CalculationNumber(),
        rezensJungbier = new CalculationNumber(),
        rezensDifferenz = new CalculationNumber(),
        restextraktGruenschlauchen = new CalculationNumber(),
        mengeJungbier = new CalculationNumber(),
        zusatzZuckerLiter = new CalculationNumber(),
        zusatzZuckerJungbier = new CalculationNumber(),
        zusatzTraubenzuckerLiter = new CalculationNumber(),
        zusatzTraubenzuckerJungbier = new CalculationNumber(),
        erhoehungAlkVol = new CalculationNumber(),
        extraktSpeise = new CalculationNumber(),
        zusatzSpeiseLiter = new CalculationNumber(),
        zusatzSpeiseJungbier = new CalculationNumber(),
        ausschlagmenge = new CalculationNumber(),
        schuettung = new CalculationNumber(),
        sudhausausbeute = new CalculationNumber(),
        masseMalz = new CalculationNumber(),
        volumenGerste = new CalculationNumber(),
        volumenWeizen = new CalculationNumber(),
        spunddruck = new CalculationNumber(),
        fassTemperatur = new CalculationNumber(),
        dreisatzA1 = new CalculationNumber(),
        dreisatzB1 = new CalculationNumber(),
        dreisatzA2 = new CalculationNumber(),
        dreisatzB2 = new CalculationNumber(),
        mischkreuzWert1 = new CalculationNumber(),
        mischkreuzWert2 = new CalculationNumber(),
        mischkreuzZielwert = new CalculationNumber(),
        mischkreuzAnteil1 = new CalculationNumber(),
        mischkreuzAnteil2 = new CalculationNumber(),
        einheitenEingabe = new CalculationNumber(),
        einheitenFaktor = new CalculationNumber(),
        einheitenAusgabe = new CalculationNumber(),
        einheitenC2F = new CalculationNumber(),
        einheitenC2K = new CalculationNumber(),
        einheitenF2C = new CalculationNumber(),
        einheitenK2C = new CalculationNumber(),
        einheitenP2SG = new CalculationNumber(),
        einheitenSG2P = new CalculationNumber(),
        //pages
        pageAlkoholgehalt = new CalculationPage(),
        pageEvg = new CalculationPage(),
        pageBrennwert = new CalculationPage(),
        pageKarbonisierungZucker = new CalculationPage(),
        pageKarbonisierungGruen = new CalculationPage(),
        pageKarbonisierungSpeise = new CalculationPage(),
        pageSudhausausbeute = new CalculationPage(),
        pageVolumenMalz = new CalculationPage(),
        pageSpunddruck = new CalculationPage(),
        pageDreisatz = new CalculationPage(),
        pageMischkreuz = new CalculationPage(),
        pageEinheiten = new CalculationPage();

	calculationNumberList.push(stammwuerzeBrix);
	calculationNumberList.push(restextraktBrix);
    calculationNumberList.push(brixPlatoVerhaeltnis);
	calculationNumberList.push(stammwuerzePlatoVorKorrektur);
    calculationNumberList.push(stammwuerzeTemperatur);
	calculationNumberList.push(stammwuerzePlato);
	calculationNumberList.push(restextraktPlatoVorKorrektur);
    calculationNumberList.push(restextraktTemperatur);
	calculationNumberList.push(restextraktPlato);
	calculationNumberList.push(restextraktTatsaechlich);
	calculationNumberList.push(dichteBier);
	calculationNumberList.push(dichteJungbier);
	calculationNumberList.push(alkoholgehaltGewicht);
	calculationNumberList.push(alkoholgehaltVolumen);
	calculationNumberList.push(evgScheinbar);
	calculationNumberList.push(evgTatsaechlich);
	calculationNumberList.push(brennwertVolumen);
	calculationNumberList.push(brennwertKalorien);
	calculationNumberList.push(brennwertJoule);
    calculationNumberList.push(rezensWunsch);
    calculationNumberList.push(gaerTemperatur);
    calculationNumberList.push(rezensJungbier);
    calculationNumberList.push(rezensDifferenz);
    calculationNumberList.push(restextraktGruenschlauchen);
    calculationNumberList.push(mengeJungbier);
    calculationNumberList.push(zusatzZuckerLiter);
    calculationNumberList.push(zusatzZuckerJungbier);
    calculationNumberList.push(zusatzTraubenzuckerLiter);
    calculationNumberList.push(zusatzTraubenzuckerJungbier);
    calculationNumberList.push(erhoehungAlkVol);
    calculationNumberList.push(extraktSpeise);
    calculationNumberList.push(zusatzSpeiseLiter);
    calculationNumberList.push(zusatzSpeiseJungbier);
    calculationNumberList.push(ausschlagmenge);
    calculationNumberList.push(schuettung);
    calculationNumberList.push(sudhausausbeute);
    calculationNumberList.push(masseMalz);
    calculationNumberList.push(volumenGerste);
    calculationNumberList.push(volumenWeizen);
    calculationNumberList.push(spunddruck);
    calculationNumberList.push(fassTemperatur);
    calculationNumberList.push(dreisatzA1);
    calculationNumberList.push(dreisatzB1);
    calculationNumberList.push(dreisatzA2);
    calculationNumberList.push(dreisatzB2);
    calculationNumberList.push(mischkreuzWert1);
    calculationNumberList.push(mischkreuzWert2);
    calculationNumberList.push(mischkreuzZielwert);
    calculationNumberList.push(mischkreuzAnteil1);
    calculationNumberList.push(mischkreuzAnteil2);
    calculationNumberList.push(einheitenEingabe);
    calculationNumberList.push(einheitenFaktor);
    calculationNumberList.push(einheitenAusgabe);
    calculationNumberList.push(einheitenC2F);
    calculationNumberList.push(einheitenC2K);
    calculationNumberList.push(einheitenF2C);
    calculationNumberList.push(einheitenK2C);
    calculationNumberList.push(einheitenP2SG);
    calculationNumberList.push(einheitenSG2P);

    // Stammwürze Brix
	stammwuerzeBrix.identifier = 'stammwuerzeBrix';
	stammwuerzeBrix.title = 'Stammwürze (°Brix)';
    stammwuerzeBrix.min = 0;
    stammwuerzeBrix.max = 100;

    // Restextrakt Brix
	restextraktBrix.identifier = 'restextraktBrix';
	restextraktBrix.title = 'Restextrakt (°Brix)';
    restextraktBrix.min = 0;
    restextraktBrix.max = 100;

    // Plato-Brix-Konstante
	brixPlatoVerhaeltnis.identifier = 'brixPlatoVerhaeltnis';
	brixPlatoVerhaeltnis.title = 'Brix/Plato-Verhältnis';
    brixPlatoVerhaeltnis.min = 1;
    brixPlatoVerhaeltnis.max = 1.1;
    Calculation.storeValue('brixPlatoVerhaeltnis', 1.03);

    // Stammwürze Plato vor Korrektur
	stammwuerzePlatoVorKorrektur.identifier = 'stammwuerzePlatoVorKorrektur';
	stammwuerzePlatoVorKorrektur.title = 'Stammwürze vor Korrektur (°Plato)';
    stammwuerzePlatoVorKorrektur.min = 0;
    stammwuerzePlatoVorKorrektur.max = 100;
	stammwuerzePlatoVorKorrektur.calculation = function () {
		return stammwuerzeBrix.value / brixPlatoVerhaeltnis.value;
	};
	stammwuerzePlatoVorKorrektur.addDependent(stammwuerzeBrix);
	stammwuerzePlatoVorKorrektur.addDependent(brixPlatoVerhaeltnis);

    // Korrektur Temperatur Stammwürze
    stammwuerzeTemperatur.identifier = 'stammwuerzeTemperatur';
	stammwuerzeTemperatur.title = 'Temp. Korrektur Stammwürze (°C)';
    stammwuerzeTemperatur.min = 5;
    stammwuerzeTemperatur.max = 95;

    // Stammwürze Plato
	stammwuerzePlato.identifier = 'stammwuerzePlato';
	stammwuerzePlato.title = 'Stammwürze (°Plato)';
    stammwuerzePlato.min = 0;
    stammwuerzePlato.max = 100;
	stammwuerzePlato.calculation = function () {
        var temp = isNaN(stammwuerzeTemperatur.value) || optionBrixPlato === 'brix' ? 20 : stammwuerzeTemperatur.value;
		return smoothCP(temp, stammwuerzePlatoVorKorrektur.value);
	};
	stammwuerzePlato.addDependent(stammwuerzeTemperatur);
	stammwuerzePlato.addDependent(stammwuerzePlatoVorKorrektur);

    // Restextrakt Plato vor Korrektur
	restextraktPlatoVorKorrektur.identifier = 'restextraktPlatoVorKorrektur';
	restextraktPlatoVorKorrektur.title = 'Restextrakt vor Korrektur (°Plato)';
    restextraktPlatoVorKorrektur.min = 0;
    restextraktPlatoVorKorrektur.max = 100;
	restextraktPlatoVorKorrektur.calculation = function () {
        var stammwuerzeTemp = stammwuerzeBrix.value / brixPlatoVerhaeltnis.value,
            spezifischesGewicht = 1.001843 -
                0.002318474 * stammwuerzeTemp -
                0.000007775 * Math.pow(stammwuerzeTemp, 2) -
                0.000000034 * Math.pow(stammwuerzeTemp, 3) +
                0.005740000 * restextraktBrix.value +
                0.000033440 * Math.pow(restextraktBrix.value, 2) +
                0.000000086 * Math.pow(restextraktBrix.value, 3);
        return 668.72 * spezifischesGewicht - 463.37 - 205.347 * Math.pow(spezifischesGewicht, 2);
	};
    restextraktPlatoVorKorrektur.addDependent(stammwuerzeBrix);
    restextraktPlatoVorKorrektur.addDependent(brixPlatoVerhaeltnis);
    restextraktPlatoVorKorrektur.addDependent(restextraktBrix);

    // Korrektur Temperatur Restextrakt
    restextraktTemperatur.identifier = 'restextraktTemperatur';
	restextraktTemperatur.title = 'Temp. Korrektur Restextrakts (°C)';
    restextraktTemperatur.min = 5;
    restextraktTemperatur.max = 95;

    // Restextrakt Plato
	restextraktPlato.identifier = 'restextraktPlato';
	restextraktPlato.title = 'Restextrakt (°Plato)';
    restextraktPlato.min = 0;
    restextraktPlato.max = 100;
	restextraktPlato.calculation = function () {
        var temp = isNaN(restextraktTemperatur.value) || optionBrixPlato === 'brix' ? 20 : restextraktTemperatur.value;
		return smoothCP(temp, restextraktPlatoVorKorrektur.value);
	};
	restextraktPlato.addDependent(restextraktTemperatur);
	restextraktPlato.addDependent(restextraktPlatoVorKorrektur);

    // Tatsächlicher Restextrakt
    restextraktTatsaechlich.identifier = 'restextraktTatsaechlich';
	restextraktTatsaechlich.title = 'Tatsächlicher Restextrakt (% vol.)';
    restextraktTatsaechlich.min = 0;
    restextraktTatsaechlich.max = 100;
	restextraktTatsaechlich.calculation = function () {
		return 0.1808 * stammwuerzePlato.value + 0.8192 * restextraktPlato.value;
	};
	restextraktTatsaechlich.addDependent(stammwuerzePlato);
    restextraktTatsaechlich.addDependent(restextraktPlato);

    // Dichte Bier
    dichteBier.identifier = 'dichteBier';
	dichteBier.title = 'Dichte Bier (g/ml)';
    dichteBier.min = 0;
    dichteBier.decimalPlaces = 4;
	dichteBier.calculation = function () {
		return 261.1 / (261.53 - restextraktPlato.value);
	};
    dichteBier.addDependent(restextraktPlato);

    // Dichte Jungbier
    dichteJungbier.identifier = 'dichteJungbier';
	dichteJungbier.title = 'Dichte Jungbier (g/ml)';
    dichteJungbier.min = 0;
    dichteJungbier.decimalPlaces = 4;
	dichteJungbier.calculation = function () {
		return 261.1 / (261.53 - stammwuerzePlato.value);
	};
    dichteJungbier.addDependent(stammwuerzePlato);

    // Alkoholgehalt Gewicht
	alkoholgehaltGewicht.identifier = 'alkoholgehaltGewicht';
	alkoholgehaltGewicht.title = 'Alkoholgehalt (g/l)';
    alkoholgehaltGewicht.min = 0;
	alkoholgehaltGewicht.calculation = function () {
        return (stammwuerzePlato.value - restextraktTatsaechlich.value) /
            (2.0665 - 0.010665 * stammwuerzePlato.value);
	};
	alkoholgehaltGewicht.addDependent(stammwuerzePlato);
    alkoholgehaltGewicht.addDependent(restextraktTatsaechlich);

    // Alkoholgehalt Volumen
	alkoholgehaltVolumen.identifier = 'alkoholgehaltVolumen';
	alkoholgehaltVolumen.title = 'Alkoholgehalt (% vol.)';
    alkoholgehaltVolumen.min = 0;
    alkoholgehaltVolumen.max = 100;
	alkoholgehaltVolumen.calculation = function () {
		return dichteBier.value * alkoholgehaltGewicht.value / 0.7894;
	};
	alkoholgehaltVolumen.addDependent(dichteBier);
    alkoholgehaltVolumen.addDependent(alkoholgehaltGewicht);

    // Scheinbarer Endvergärungsgrad
    evgScheinbar.identifier = 'evgScheinbar';
	evgScheinbar.title = 'Scheinbarer EVG (%)';
    evgScheinbar.min = 0;
    evgScheinbar.max = 100;
	evgScheinbar.calculation = function () {
		return 100 * (1 - restextraktPlato.value / stammwuerzePlato.value);
	};
	evgScheinbar.addDependent(stammwuerzePlato);
    evgScheinbar.addDependent(restextraktPlato);

    // Tatsächlicher Endvergärungsgrad
    evgTatsaechlich.identifier = 'evgTatsaechlich';
	evgTatsaechlich.title = 'Tatsächlicher EVG (%)';
    evgTatsaechlich.min = 0;
    evgTatsaechlich.max = 100;
	evgTatsaechlich.calculation = function () {
		return 100 * (1 - restextraktTatsaechlich.value / stammwuerzePlato.value);
	};
	evgTatsaechlich.addDependent(stammwuerzePlato);
	evgTatsaechlich.addDependent(restextraktTatsaechlich);

    // Brennwert Volumen
    brennwertVolumen.identifier = 'brennwertVolumen';
	brennwertVolumen.title = 'Volumen (l)';
    brennwertVolumen.min = 0;

    // Brennwert Kalorien
    brennwertKalorien.identifier = 'brennwertKalorien';
	brennwertKalorien.title = 'Brennwert (kcal)';
    brennwertKalorien.min = 0;
	brennwertKalorien.calculation = function () {
		return (6.9 * alkoholgehaltGewicht.value + 4 * (restextraktTatsaechlich.value - 0.1)) *
            10 * brennwertVolumen.value * dichteBier.value;
	};
	brennwertKalorien.addDependent(alkoholgehaltGewicht);
    brennwertKalorien.addDependent(restextraktTatsaechlich);
	brennwertKalorien.addDependent(brennwertVolumen);
    brennwertKalorien.addDependent(dichteBier);

    // Brennwert Joule
    brennwertJoule.identifier = 'brennwertJoule';
	brennwertJoule.title = 'Brennwert (kJ)';
    brennwertJoule.min = 0;
	brennwertJoule.calculation = function () {
		return brennwertKalorien.value * 4.18684;
	};
	brennwertJoule.addDependent(brennwertKalorien);

    // Gewünschte Rezens
    rezensWunsch.identifier = 'rezensWunsch';
	rezensWunsch.title = 'Gewünschter CO<small>2</small>-Gehalt (g/l)';
    rezensWunsch.min = 0;
    rezensWunsch.max = 12;

    // Gärtemperatur
    gaerTemperatur.identifier = 'gaerTemperatur';
	gaerTemperatur.title = 'Gärtemperatur (°C)';
    gaerTemperatur.min = 0;
    gaerTemperatur.max = 30;

    // Sättigung Jungbier
    rezensJungbier.identifier = 'rezensJungbier';
	rezensJungbier.title = 'CO<small>2</small>-Gehalt Jungbier (g/l)';
    rezensJungbier.min = 0;
    rezensJungbier.max = 12;
    rezensJungbier.calculation = function () {
		return smoothKohlensaeureSaettigung(gaerTemperatur.value);
	};
	rezensJungbier.addDependent(gaerTemperatur);

    // Differenz Rezens
    rezensDifferenz.identifier = 'rezensDifferenz';
	rezensDifferenz.title = 'Differenz CO<small>2</small>-Gehalt (g/l)';
    rezensDifferenz.min = 0;
    rezensDifferenz.calculation = function () {
		return rezensWunsch.value - rezensJungbier.value;
	};
	rezensDifferenz.addDependent(rezensWunsch);
    rezensDifferenz.addDependent(rezensJungbier);

    // Zucker pro Liter
    zusatzZuckerLiter.identifier = 'zusatzZuckerLiter';
	zusatzZuckerLiter.title = 'Zucker/Extrakt pro Liter (g/l)';
    zusatzZuckerLiter.min = 0;
    zusatzZuckerLiter.calculation = function () {
		return 2 * rezensDifferenz.value;
	};
	zusatzZuckerLiter.addDependent(rezensDifferenz);

    // Traubenzucker pro Liter
    zusatzTraubenzuckerLiter.identifier = 'zusatzTraubenzuckerLiter';
	zusatzTraubenzuckerLiter.title = 'Traubenzucker pro Liter (g/l)';
    zusatzTraubenzuckerLiter.min = 0;
    zusatzTraubenzuckerLiter.calculation = function () {
		return 1.1578 * zusatzZuckerLiter.value;
	};
	zusatzTraubenzuckerLiter.addDependent(zusatzZuckerLiter);

    // Erhöhung Alkoholgehalt
    erhoehungAlkVol.identifier = "erhoehungAlkVol";
    erhoehungAlkVol.title = "Erhöhung Alkoholgehalt (% vol.)";
    erhoehungAlkVol.min = 0;
    erhoehungAlkVol.calculation = function () {
        return zusatzZuckerLiter.value / 2 / 1.6 / 0.7894 / 10;
    };
    erhoehungAlkVol.addDependent(zusatzZuckerLiter);

    // Volumen Jungbier
    mengeJungbier.identifier = 'mengeJungbier';
	mengeJungbier.title = 'Volumen Jungbier (l)';
    mengeJungbier.min = 0;

    // Zucker pro Jungbier
    zusatzZuckerJungbier.identifier = 'zusatzZuckerJungbier';
	zusatzZuckerJungbier.title = 'Zucker/Extrakt pro Jungbier (g/JB)';
    zusatzZuckerJungbier.min = 0;
    zusatzZuckerJungbier.calculation = function () {
		return zusatzZuckerLiter.value * mengeJungbier.value;
	};
	zusatzZuckerJungbier.addDependent(zusatzZuckerLiter);
	zusatzZuckerJungbier.addDependent(mengeJungbier);

    // Traubenzucker pro Jungbier
    zusatzTraubenzuckerJungbier.identifier = 'zusatzTraubenzuckerJungbier';
	zusatzTraubenzuckerJungbier.title = 'Traubenzucker pro Jungbier (g/JB)';
    zusatzTraubenzuckerJungbier.min = 0;
    zusatzTraubenzuckerJungbier.calculation = function () {
		return zusatzTraubenzuckerLiter.value * mengeJungbier.value;
	};
	zusatzTraubenzuckerJungbier.addDependent(zusatzTraubenzuckerLiter);
	zusatzTraubenzuckerJungbier.addDependent(mengeJungbier);

    // Restextrakt Grünschlauchen
    restextraktGruenschlauchen.identifier = 'restextraktGruenschlauchen';
	restextraktGruenschlauchen.title = 'Restextrakt beim Abfüllen (°Plato)';
    restextraktGruenschlauchen.min = 0;
    restextraktGruenschlauchen.max = 100;
    restextraktGruenschlauchen.calculation = function () {
		return restextraktPlato.value + (zusatzZuckerLiter.value / (8.192 * dichteBier.value));
	};
	restextraktGruenschlauchen.addDependent(restextraktPlato);
    restextraktGruenschlauchen.addDependent(zusatzZuckerLiter);
    restextraktGruenschlauchen.addDependent(dichteBier);

    // Extrakt Speise
    extraktSpeise.identifier = 'extraktSpeise';
	extraktSpeise.title = 'Extrakt in Speise (g/l)';
    extraktSpeise.min = 0;
    extraktSpeise.calculation = function () {
		return (stammwuerzePlato.value - restextraktPlato.value) * 8.192 * dichteJungbier.value;
	};
	extraktSpeise.addDependent(stammwuerzePlato);
	extraktSpeise.addDependent(restextraktPlato);
	extraktSpeise.addDependent(dichteJungbier);

    // Speise pro Liter
    zusatzSpeiseLiter.identifier = 'zusatzSpeiseLiter';
	zusatzSpeiseLiter.title = 'Speise pro Liter (ml)';
    zusatzSpeiseLiter.min = 0;
    zusatzSpeiseLiter.calculation = function () {
		return 1000 * zusatzZuckerLiter.value / (extraktSpeise.value - zusatzZuckerLiter.value);
	};
	zusatzSpeiseLiter.addDependent(zusatzZuckerLiter);
	zusatzSpeiseLiter.addDependent(extraktSpeise);

    // Speise pro Jungbier
    zusatzSpeiseJungbier.identifier = 'zusatzSpeiseJungbier';
	zusatzSpeiseJungbier.title = 'Speise pro Jungbier (ml/JB)';
    zusatzSpeiseJungbier.min = 0;
    zusatzSpeiseJungbier.calculation = function () {
		return zusatzSpeiseLiter.value * mengeJungbier.value;
	};
	zusatzSpeiseJungbier.addDependent(zusatzSpeiseLiter);
	zusatzSpeiseJungbier.addDependent(mengeJungbier);

    // Ausschlagmenge
    ausschlagmenge.identifier = 'ausschlagmenge';
    ausschlagmenge.title = 'Ausschlagmenge (l)';
    ausschlagmenge.min = 0;

    // Schüttung
    schuettung.identifier = 'schuettung';
    schuettung.title = 'Schüttung (kg)';
    schuettung.min = 0;

    // Sudhausausbeute
    sudhausausbeute.identifier = 'sudhausausbeute';
    sudhausausbeute.title = 'Sudhausausbeute (%)';
    sudhausausbeute.min = 0;
    sudhausausbeute.max = 100;
    sudhausausbeute.calculation = function () {
        return stammwuerzePlato.value * dichteJungbier.value * ausschlagmenge.value * 0.96 / schuettung.value;
    };
    sudhausausbeute.addDependent(stammwuerzePlato);
    sudhausausbeute.addDependent(dichteJungbier);
    sudhausausbeute.addDependent(ausschlagmenge);
    sudhausausbeute.addDependent(schuettung);

    // Masse Malz
    masseMalz.identifier = 'masseMalz';
    masseMalz.title = 'Malz (kg)';
    masseMalz.min = 0;
    // Gerstenmalz
    volumenGerste.identifier = 'volumenGerste';
    volumenGerste.title = 'Volumen Gerstenmalz (l)';
    volumenGerste.min = 0;
    volumenGerste.calculation = function () {
        return masseMalz.value * 1000 / 570;
    };
    volumenGerste.addDependent(masseMalz);
    // Weizenmalz
    volumenWeizen.identifier = 'volumenWeizen';
    volumenWeizen.title = 'Volumen Weizenmalz (l)';
    volumenWeizen.min = 0;
    volumenWeizen.calculation = function () {
        return masseMalz.value * 1000 / 670;
    };
    volumenWeizen.addDependent(masseMalz);

    // Fasstemperatur
    fassTemperatur.identifier = 'fassTemperatur';
    fassTemperatur.title = 'Fasstemperatur (°C)';
    fassTemperatur.min = 0;
    // Spunddruck
    spunddruck.identifier = 'spunddruck';
    spunddruck.title = 'Spunddruck (bar)';
    spunddruck.min = 0;
    spunddruck.calculation = function () {
        return rezensWunsch.value / smoothKohlensaeureSaettigung(fassTemperatur.value) - 1;
    };
    spunddruck.addDependent(rezensWunsch);
    spunddruck.addDependent(fassTemperatur);

    // Dreisatz A1
    dreisatzA1.identifier = 'dreisatzA1';
    dreisatzA1.title = 'A1 (entspricht B1)';
    // Dreisatz B1
    dreisatzB1.identifier = 'dreisatzB1';
    dreisatzB1.title = 'B1 (entspricht A1)';
    // Dreisatz A2
    dreisatzA2.identifier = 'dreisatzA2';
    dreisatzA2.title = 'A2 (entspricht B2)';
    // Dreisatz B2
    dreisatzB2.identifier = 'dreisatzB2';
    dreisatzB2.title = 'B2 (entspricht A2)';
    dreisatzB2.calculation = function () {
        return dreisatzA2.value * dreisatzA1.value / dreisatzB1.value;
    };
    dreisatzB2.addDependent(dreisatzA1);
    dreisatzB2.addDependent(dreisatzB1);
    dreisatzB2.addDependent(dreisatzA2);

    // Mischkreuz Wert 1
    mischkreuzWert1.identifier = 'mischkreuzWert1';
    mischkreuzWert1.title = 'Wert 1';
    // Mischkreuz Wert 2
    mischkreuzWert2.identifier = 'mischkreuzWert2';
    mischkreuzWert2.title = 'Wert 2';
    // Mischkreuz Zielwert
    mischkreuzZielwert.identifier = 'mischkreuzZielwert';
    mischkreuzZielwert.title = 'Zielwert';
    // Mischkreuz Anteil 1
    mischkreuzAnteil1.identifier = 'mischkreuzAnteil1';
    mischkreuzAnteil1.title = 'Anteil 1';
    // Mischkreuz Anteil 2
    mischkreuzAnteil2.identifier = 'mischkreuzAnteil2';
    mischkreuzAnteil2.title = 'Anteil 2';
    mischkreuzAnteil2.calculation = function () {
        return mischkreuzAnteil1.value * (mischkreuzWert1.value - mischkreuzZielwert.value) / (mischkreuzZielwert.value - mischkreuzWert2.value);
    };
    mischkreuzAnteil2.addDependent(mischkreuzWert1);
    mischkreuzAnteil2.addDependent(mischkreuzWert2);
    mischkreuzAnteil2.addDependent(mischkreuzZielwert);
    mischkreuzAnteil2.addDependent(mischkreuzAnteil1);

    // Einheiten Eingabe
    einheitenEingabe.identifier = 'einheitenEingabe';
    einheitenEingabe.title = 'Umzurechnender Wert';
    einheitenEingabe.decimalPlaces = 4;
    // Einheiten Faktor
    einheitenFaktor.identifier = 'einheitenFaktor';
    einheitenFaktor.title = 'Faktor';
    einheitenFaktor.decimalPlaces = 10;
    // Einheiten Ausgabe
    einheitenAusgabe.identifier = 'einheitenAusgabe';
    einheitenAusgabe.title = 'Umgerechneter Wert';
    einheitenAusgabe.decimalPlaces = 6;
    einheitenAusgabe.calculation = function () {
        return einheitenEingabe.value * einheitenFaktor.value;
    };
    einheitenAusgabe.addDependent(einheitenEingabe);
    einheitenAusgabe.addDependent(einheitenFaktor);
    // Celsius nach Fahrenheit
    einheitenC2F.identifier = 'einheitenC2F';
    einheitenC2F.title = 'Umgerechneter Wert (°F)';
    einheitenC2F.calculation = function () {
        return einheitenEingabe.value * 1.8 + 32;
    };
    einheitenC2F.addDependent(einheitenEingabe);
    // Fahrenheit nach Celsius
    einheitenF2C.identifier = 'einheitenF2C';
    einheitenF2C.title = 'Umgerechneter Wert (°C)';
    einheitenF2C.calculation = function () {
        return (einheitenEingabe.value - 32) / 1.8;
    };
    einheitenF2C.addDependent(einheitenEingabe);
    // Celsius nach Kelvin
    einheitenC2K.identifier = 'einheitenC2K';
    einheitenC2K.title = 'Umgerechneter Wert (K)';
    einheitenC2K.calculation = function () {
        return einheitenEingabe.value + 273.15;
    };
    einheitenC2K.addDependent(einheitenEingabe);
    // Kelvin nach Celsius
    einheitenK2C.identifier = 'einheitenK2C';
    einheitenK2C.title = 'Umgerechneter Wert (°C)';
    einheitenK2C.calculation = function () {
        return einheitenEingabe.value - 273.15;
    };
    einheitenK2C.addDependent(einheitenEingabe);
    // Plato nach Specific Gravity
    einheitenP2SG.identifier = 'einheitenP2SG';
    einheitenP2SG.title = 'Umgerechneter Wert (SG)';
    einheitenP2SG.decimalPlaces = 4;
    einheitenP2SG.calculation = function () {
        return 1 + einheitenEingabe.value / (258.6 - 227.1 / 258.2 * einheitenEingabe.value);
    };
    einheitenP2SG.addDependent(einheitenEingabe);
    // Specific Gravity nach Plato
    einheitenSG2P.identifier = 'einheitenSG2P';
    einheitenSG2P.title = 'Umgerechneter Wert (°P)';
    einheitenSG2P.decimalPlaces = 4;
    einheitenSG2P.calculation = function () {
        return 3338530 * (einheitenEingabe.value - 1) / (1555 + 11355 * einheitenEingabe.value);
    };
    einheitenSG2P.addDependent(einheitenEingabe);

    // pages
    // Alkoholgehalt
	pageAlkoholgehalt.identifier = 'alk';
	pageAlkoholgehalt.title = 'Alkoholgehalt';
    pageAlkoholgehalt.addParameter(stammwuerzeBrix);
    pageAlkoholgehalt.addParameter(restextraktBrix);
	pageAlkoholgehalt.addParameter(stammwuerzePlatoVorKorrektur);
    pageAlkoholgehalt.addParameter(stammwuerzeTemperatur);
	pageAlkoholgehalt.addParameter(stammwuerzePlato);
    pageAlkoholgehalt.addParameter(restextraktPlatoVorKorrektur);
    pageAlkoholgehalt.addParameter(restextraktTemperatur);
    pageAlkoholgehalt.addParameter(restextraktPlato);
	pageAlkoholgehalt.addResult(stammwuerzePlato);
    pageAlkoholgehalt.addResult(restextraktPlato);
    pageAlkoholgehalt.addResult(restextraktTatsaechlich);
	pageAlkoholgehalt.addResult(alkoholgehaltGewicht);
    pageAlkoholgehalt.addResult(alkoholgehaltVolumen);

    // Endvergärungsgrad
	pageEvg.identifier = 'evg';
	pageEvg.title = 'Endvergärungsgrad';
    pageEvg.addParameter(stammwuerzeBrix);
    pageEvg.addParameter(restextraktBrix);
	pageEvg.addParameter(stammwuerzePlatoVorKorrektur);
    pageEvg.addParameter(stammwuerzeTemperatur);
	pageEvg.addParameter(stammwuerzePlato);
    pageEvg.addParameter(restextraktPlatoVorKorrektur);
    pageEvg.addParameter(restextraktTemperatur);
    pageEvg.addParameter(restextraktPlato);
	pageEvg.addResult(stammwuerzePlato);
    pageEvg.addResult(restextraktPlato);
	pageEvg.addResult(evgScheinbar);
    pageEvg.addResult(restextraktTatsaechlich);
    pageEvg.addResult(evgTatsaechlich);

    // Brennwert
	pageBrennwert.identifier = 'brennwert';
	pageBrennwert.title = 'Brennwert';
    pageBrennwert.addParameter(stammwuerzeBrix);
    pageBrennwert.addParameter(restextraktBrix);
	pageBrennwert.addParameter(stammwuerzePlatoVorKorrektur);
    pageBrennwert.addParameter(stammwuerzeTemperatur);
	pageBrennwert.addParameter(stammwuerzePlato);
    pageBrennwert.addParameter(restextraktPlatoVorKorrektur);
    pageBrennwert.addParameter(restextraktTemperatur);
    pageBrennwert.addParameter(restextraktPlato);
    pageBrennwert.addParameter(brennwertVolumen);
	pageBrennwert.addResult(stammwuerzePlato);
    pageBrennwert.addResult(restextraktPlato);
    pageBrennwert.addResult(restextraktTatsaechlich);
	pageBrennwert.addResult(alkoholgehaltGewicht);
    pageBrennwert.addResult(dichteBier);
	pageBrennwert.addResult(brennwertKalorien);
    pageBrennwert.addResult(brennwertJoule);

    // Karbonisierung Zuckerzusatz
    pageKarbonisierungZucker.identifier = 'karbonisierungZucker';
    pageKarbonisierungZucker.title = 'Karbonisierung Zucker';
    pageKarbonisierungZucker.addParameter(rezensWunsch);
    pageKarbonisierungZucker.addParameter(gaerTemperatur);
    pageKarbonisierungZucker.addParameter(mengeJungbier);
    pageKarbonisierungZucker.addResult(rezensJungbier);
    pageKarbonisierungZucker.addResult(rezensDifferenz);
    pageKarbonisierungZucker.addResult(zusatzZuckerLiter);
    pageKarbonisierungZucker.addResult(zusatzZuckerJungbier);
    pageKarbonisierungZucker.addResult(zusatzTraubenzuckerLiter);
    pageKarbonisierungZucker.addResult(zusatzTraubenzuckerJungbier);
    pageKarbonisierungZucker.addResult(erhoehungAlkVol);

    // Karbonisierung Grünschlauchen
    pageKarbonisierungGruen.identifier = 'karbonisierungGruen';
    pageKarbonisierungGruen.title = 'Grünschlauchen';
    pageKarbonisierungGruen.addParameter(rezensWunsch);
    pageKarbonisierungGruen.addParameter(gaerTemperatur);
    pageKarbonisierungGruen.addParameter(stammwuerzeBrix);
    pageKarbonisierungGruen.addParameter(restextraktBrix);
    pageKarbonisierungGruen.addParameter(restextraktPlatoVorKorrektur);
    pageKarbonisierungGruen.addParameter(restextraktTemperatur);
    pageKarbonisierungGruen.addParameter(restextraktPlato);
    pageKarbonisierungGruen.addResult(restextraktPlato);
    pageKarbonisierungGruen.addResult(dichteBier);
    pageKarbonisierungGruen.addResult(restextraktGruenschlauchen);

    // Karbonisierung Speise
    pageKarbonisierungSpeise.identifier = 'karbonisierungSpeise';
    pageKarbonisierungSpeise.title = 'Karbonisierung Speise';
    pageKarbonisierungSpeise.addParameter(rezensWunsch);
    pageKarbonisierungSpeise.addParameter(gaerTemperatur);
    pageKarbonisierungSpeise.addParameter(stammwuerzeBrix);
    pageKarbonisierungSpeise.addParameter(restextraktBrix);
	pageKarbonisierungSpeise.addParameter(stammwuerzePlatoVorKorrektur);
    pageKarbonisierungSpeise.addParameter(stammwuerzeTemperatur);
	pageKarbonisierungSpeise.addParameter(stammwuerzePlato);
    pageKarbonisierungSpeise.addParameter(restextraktPlatoVorKorrektur);
    pageKarbonisierungSpeise.addParameter(restextraktTemperatur);
    pageKarbonisierungSpeise.addParameter(restextraktPlato);
    pageKarbonisierungSpeise.addParameter(mengeJungbier);
    pageKarbonisierungSpeise.addResult(stammwuerzePlato);
    pageKarbonisierungSpeise.addResult(restextraktPlato);
    pageKarbonisierungSpeise.addResult(dichteJungbier);
    pageKarbonisierungSpeise.addResult(extraktSpeise);
    pageKarbonisierungSpeise.addResult(zusatzSpeiseLiter);
    pageKarbonisierungSpeise.addResult(zusatzSpeiseJungbier);

    // Sudhausausbeute
    pageSudhausausbeute.identifier = 'pageSudhausausbeute';
    pageSudhausausbeute.title = 'Sudhausausbeute';
    pageSudhausausbeute.addParameter(stammwuerzeBrix);
	pageSudhausausbeute.addParameter(stammwuerzePlatoVorKorrektur);
    pageSudhausausbeute.addParameter(stammwuerzeTemperatur);
	pageSudhausausbeute.addParameter(stammwuerzePlato);
	pageSudhausausbeute.addParameter(ausschlagmenge);
	pageSudhausausbeute.addParameter(schuettung);
    pageSudhausausbeute.addResult(stammwuerzePlato);
    pageSudhausausbeute.addResult(dichteJungbier);
    pageSudhausausbeute.addResult(sudhausausbeute);

    // Volumen Malz
    pageVolumenMalz.identifier = 'pageVolumenMalz';
    pageVolumenMalz.title = 'Volumen Malz';
    pageVolumenMalz.addParameter(masseMalz);
    pageVolumenMalz.addResult(volumenGerste);
    pageVolumenMalz.addResult(volumenWeizen);

    // Spunddruck
    pageSpunddruck.identifier = 'pageSpunddruck';
    pageSpunddruck.title = 'Spunddruck';
    pageSpunddruck.addParameter(rezensWunsch);
    pageSpunddruck.addParameter(fassTemperatur);
    pageSpunddruck.addResult(spunddruck);

    // Dreisatz
    pageDreisatz.identifier = 'pageDreisatz';
    pageDreisatz.title = 'Dreisatz';
    pageDreisatz.parameterBefore = '<section data-role="collapsible">' +
        '<h4>Beispiel: Alternativer Hopfen verwenden</h4>' +
        '<p>' +
        'A1 (Alphasäure Rezepthopfen) = 5 %<br/>' +
        'B1 (Alphasäure Alternativhopfen) = 10 %<br/>' +
        'A2 (Masse Rezepthopfen) = 30 g<br/>' +
        '<strong>&rArr; B2 (Masse Alternativhopfen) = 15 g</strong>' +
        '</p>' +
        '</section>';
    pageDreisatz.addParameter(dreisatzA1);
    pageDreisatz.addParameter(dreisatzB1);
    pageDreisatz.addParameter(dreisatzA2);
    pageDreisatz.addResult(dreisatzB2);

    // Mischungskreuz
    pageMischkreuz.identifier = 'pageMischkreuz';
    pageMischkreuz.title = 'Mischungskreuz';
    pageMischkreuz.parameterBefore = '<section data-role="collapsible">' +
        '<h4>Beispiel: Stammwürze mit Wasser einstellen</h4>' +
        '<p>' +
        'Wert1 (Stammwürze Jungbier vor dem Verdünnen) = 15 °P<br/>' +
        'Wert2 (Stammwürze Verdünnwasser) = 0 °P<br/>' +
        'Zielwert (Angestrebte Stammwürze) = 12 °P<br/>' +
        'Anteil1 (Volumen Jungbier vor dem Verdünnen) = 20 l<br/>' +
        '<strong>&rArr; Anteil2 (Volumen Verdünnwasser) = 5 l</strong>' +
        '</p>' +
        '</section>';
    pageMischkreuz.addParameter(mischkreuzWert1);
    pageMischkreuz.addParameter(mischkreuzWert2);
    pageMischkreuz.addParameter(mischkreuzZielwert);
    pageMischkreuz.addParameter(mischkreuzAnteil1);
    pageMischkreuz.addResult(mischkreuzAnteil2);

    // Einheiten
    pageEinheiten.identifier = 'pageEinheiten';
    pageEinheiten.title = 'Einheiten';
    pageEinheiten.addParameter(einheitenEingabe);
    pageEinheiten.addParameter(einheitenFaktor);
    pageEinheiten.parameterAfter = einheitenAuswahl;
    pageEinheiten.addResult(einheitenFaktor);
    pageEinheiten.addResult(einheitenAusgabe);
    pageEinheiten.addResult(einheitenC2F);
    pageEinheiten.addResult(einheitenC2K);
    pageEinheiten.addResult(einheitenF2C);
    pageEinheiten.addResult(einheitenK2C);
    pageEinheiten.addResult(einheitenP2SG);
    pageEinheiten.addResult(einheitenSG2P);

    // populate CalculationPage-objects
	pageAlkoholgehalt.populate();
	pageBrennwert.populate();
    pageDreisatz.populate();
    pageEinheiten.populate();
	pageEvg.populate();
    pageKarbonisierungGruen.populate();
    pageKarbonisierungSpeise.populate();
    pageKarbonisierungZucker.populate();
    pageMischkreuz.populate();
    pageSpunddruck.populate();
    pageSudhausausbeute.populate();
    pageVolumenMalz.populate();

    // initialize and set event-handler to CalculationNumber-objects
	for (i = 0; i < calculationNumberList.length; i = i + 1) {
		calculationNumberList[i].initialize();
	}
	for (i = 0; i < calculationNumberList.length; i = i + 1) {
		calculationNumberList[i].setHandler();
	}

    // set event-handler to select
    $('#einheitenAuswahl').on('change', function () {
        $('body').removeClass('optionEinheiten-C2F').removeClass('optionEinheiten-C2K')
            .removeClass('optionEinheiten-F2C').removeClass('optionEinheiten-K2C')
            .removeClass('optionEinheiten-P2SG').removeClass('optionEinheiten-SG2P');
        var val = $(this).val();
        if (isNaN(val)) {
            $('body').addClass('optionEinheiten-' + val);
        } else {
            $('input.einheitenFaktor').val(val).change();
        }
    });

    // optionBrixPlato
    optionBrixPlato = Calculation.loadValue('optionBrixPlato') === 'plato' ? 'plato' : 'brix';
    $('body').addClass('optionBrixPlato-' + optionBrixPlato);
    $('#radio-optionBrixPlato-brix').prop('checked', false);
    $('#radio-optionBrixPlato-plato').prop('checked', false);
    $('#radio-optionBrixPlato-' + optionBrixPlato).prop('checked', true);
    $('input[type="radio"][name="radio-optionBrixPlato"]').on('change', function () {
        optionBrixPlato = ($(this).val() === 'plato') ? 'plato' : 'brix';
        $('body').removeClass('optionBrixPlato-brix').removeClass('optionBrixPlato-plato').addClass('optionBrixPlato-' + optionBrixPlato);
        Calculation.storeValue('optionBrixPlato', optionBrixPlato);
    });
    // optionSpindelKorrektur
    optionSpindelKorrekturSW = Calculation.loadValue('optionSpindelKorrekturSW') === 'y' ? 'y' : 'n';
    optionSpindelKorrekturRE = Calculation.loadValue('optionSpindelKorrekturRE') === 'y' ? 'y' : 'n';
    $('body').addClass('optionSpindelKorrekturSW-' + optionSpindelKorrekturSW);
    $('body').addClass('optionSpindelKorrekturRE-' + optionSpindelKorrekturRE);
    $('#checkbox-optionSpindelKorrektur-sw').prop('checked', (optionSpindelKorrekturSW === 'y') ? true : false);
    $('#checkbox-optionSpindelKorrektur-re').prop('checked', (optionSpindelKorrekturRE === 'y') ? true : false);
    $('input[type="checkbox"][name="checkbox-optionSpindelKorrektur-sw"]').on('change', function () {
        $('body').removeClass('optionSpindelKorrekturSW-y').removeClass('optionSpindelKorrekturSW-n');
        if ($(this).prop('checked')) {
            optionSpindelKorrekturSW = 'y';
            $('body').addClass('optionSpindelKorrekturSW-' + optionSpindelKorrekturSW);
            Calculation.storeValue('optionSpindelKorrekturSW', optionSpindelKorrekturSW);
        } else {
            optionSpindelKorrekturSW = 'n';
            $('body').addClass('optionSpindelKorrekturSW-' + optionSpindelKorrekturSW);
            Calculation.storeValue('optionSpindelKorrekturSW', optionSpindelKorrekturSW);
        }
    });
    $('input[type="checkbox"][name="checkbox-optionSpindelKorrektur-re"]').on('change', function () {
        $('body').removeClass('optionSpindelKorrekturRE-y').removeClass('optionSpindelKorrekturRE-n');
        if ($(this).prop('checked')) {
            optionSpindelKorrekturRE = 'y';
            $('body').addClass('optionSpindelKorrekturRE-' + optionSpindelKorrekturRE);
            Calculation.storeValue('optionSpindelKorrekturRE', optionSpindelKorrekturRE);
        } else {
            optionSpindelKorrekturRE = 'n';
            $('body').addClass('optionSpindelKorrekturRE-' + optionSpindelKorrekturRE);
            Calculation.storeValue('optionSpindelKorrekturRE', optionSpindelKorrekturRE);
        }
    });
    // optionLocalStorage
    $('#button-optionLocalStorage').on('click', function () {
        $('#radio-optionBrixPlato-brix').prop('checked', true);
        $('#radio-optionBrixPlato-plato').prop('checked', false);
        Calculation.clear();
        document.location.reload();
    });

    // use header, footer, panel and popup outside of pages
	$('header').toolbar({
		position: 'fixed',
        tapToggle: false,
		theme: 'b'
	}).enhanceWithin();
    $('footer').toolbar({
        theme: 'a'
	}).enhanceWithin();
	$('#panel-menu').panel({
        display: 'overlay',
        positionFixed: true,
        theme: 'b'
	}).enhanceWithin();
	$('#panel-options').panel({
        display: 'overlay',
        position: 'right',
        positionFixed: true,
        theme: 'b'
	}).enhanceWithin();
    // open panels on swipe
    $(document).on('swiperight swipeleft', function (e) {
        if ($(window).width() / parseFloat($("body").css("font-size")) <= 90) {
            if ($('.ui-page-active').jqmData('panel') !== 'open') {
                if (e.type === 'swiperight') {
                    $('#panel-menu').panel('open');
                } else if (e.type === 'swipeleft') {
                    $('#panel-options').panel('open');
                }
            }
        }
    });

    // refresh input styles
    $('form div div:has(input.value-initial)').css({'background-color': '#fff', 'color': '#999'});
    $('form div div:has(input.value-input)').css({'background-color': '#fff', 'color': '#333'});
    $('form div div:has(input.value-calculate)').css({'background-color': '#e2ffff', 'color': '#008080'});
    $('form div div:has(input.value-unknown)').css({'background-color': '#fee', 'color': '#780000'});

});

// fix external-panel-heights
$(document).on('pagecreate', function () {
    'use strict';
    $('[data-role=panel]').one('panelbeforeopen', function () {
        var height = $.mobile.pageContainer.pagecontainer('getActivePage').outerHeight();
        $('.ui-panel').css('height', height + 1);
    });
});