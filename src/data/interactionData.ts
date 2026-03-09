/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Interaction {
  obat1: string;
  obat2: string;
  keterangan: string;
  severity: 'red' | 'yellow' | 'green'; // red = severe, yellow = moderate, green = minor
}

export const INTERACTION_DATA: Interaction[] = [
  {
    obat1: "Amlodipine",
    obat2: "Simvastatin",
    keterangan: "Amlodipine dapat meningkatkan kadar Simvastatin dalam darah, meningkatkan risiko miopati/rhabdomyolysis. Batasi dosis Simvastatin maksimal 20 mg sehari.",
    severity: "yellow"
  },
  {
    obat1: "Warfarin",
    obat2: "Aspirin",
    keterangan: "Peningkatan risiko perdarahan hebat. Penggunaan bersama harus dipantau ketat.",
    severity: "red"
  },
  {
    obat1: "Metformin",
    obat2: "Kontras Iodium",
    keterangan: "Risiko asidosis laktat. Hentikan Metformin 48 jam sebelum dan sesudah prosedur kontras.",
    severity: "red"
  },
  {
    obat1: "Digoxin",
    obat2: "Amiodarone",
    keterangan: "Amiodarone meningkatkan kadar Digoxin. Turunkan dosis Digoxin sebesar 30-50%.",
    severity: "red"
  },
  {
    obat1: "Sildenafil",
    obat2: "Isosorbide Dinitrate (ISDN)",
    keterangan: "Hipotensi berat yang berpotensi fatal. Penggunaan bersama dikontraindikasikan.",
    severity: "red"
  },
  {
    obat1: "Ciprofloxacin",
    obat2: "Antasida",
    keterangan: "Antasida mengurangi penyerapan Ciprofloxacin. Berikan jeda minimal 2 jam.",
    severity: "yellow"
  },
  {
    obat1: "Clopidogrel",
    obat2: "Omeprazole",
    keterangan: "Omeprazole dapat mengurangi efektivitas Clopidogrel. Pertimbangkan penggunaan H2 blocker atau PPI lain seperti Pantoprazole.",
    severity: "yellow"
  },
  {
    obat1: "Spironolactone",
    obat2: "Kalisos (Suplemen Kalium)",
    keterangan: "Risiko hiperkalemia berat yang dapat menyebabkan henti jantung.",
    severity: "red"
  },
  {
    obat1: "Clonidine",
    obat2: "Acebutolol",
    keterangan: "Meningkatkan tekanan darah sehingga perlu dilakukan monitor tekanan darah, ganti terapi atau stop terapi jika tekanan darah tidak terkontrol.",
    severity: "red"
  },
  {
    obat1: "Lisinopril",
    obat2: "Spironolactone",
    keterangan: "Peningkatan risiko hiperkalemia (kadar kalium tinggi dalam darah). Monitor kadar elektrolit secara rutin.",
    severity: "yellow"
  },
  {
    obat1: "Warfarin",
    obat2: "Ibuprofen",
    keterangan: "Peningkatan risiko perdarahan saluran cerna. Hindari penggunaan bersama jika memungkinkan.",
    severity: "red"
  },
  {
    obat1: "Simvastatin",
    obat2: "Clarithromycin",
    keterangan: "Peningkatan signifikan risiko miopati dan rhabdomyolysis. Hindari penggunaan bersama.",
    severity: "red"
  },
  {
    obat1: "Levofloxacin",
    obat2: "Warfarin",
    keterangan: "Dapat meningkatkan efek antikoagulan Warfarin, meningkatkan risiko perdarahan. Monitor INR.",
    severity: "yellow"
  }
];
