/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ArrowRight, 
  Info, 
  RefreshCw, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  Table as TableIcon,
  Home as HomeIcon,
  User as UserIcon,
  X,
  Plus,
  Trash2,
  AlertCircle,
  FileSpreadsheet,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import * as XLSX from 'xlsx';
import { DRUG_DATA } from './data/drugData';
import { INTERACTION_DATA, Interaction } from './data/interactionData';
import { REGULATION_DATA, Regulation } from './data/regulationData';
import { BUD_DATA, BUDItem } from './data/budData';
import { COMPATIBILITY_DATA, CompatibilityItem } from './data/compatibilityData';

// --- Types ---

type View = 'home' | 'info' | 'interaction' | 'interaction-detail' | 'fact' | 'fact-detail' | 'regulation' | 'regulation-detail' | 'bud' | 'bud-detail' | 'compatibility' | 'compatibility-detail' | 'profile';

interface Drug {
  id: string;
  name: string;
  generic: string;
  genericEn: string;
  code?: string;
  composition: string;
  description: string;
  indication: string;
  sideEffects: string;
  kfa?: string;
  therapyClass: string;
  atc: string;
  patientPreg: string;
  medRoutes: string;
  segmentation: string;
  ven?: string;
  instruction: string;
  reference: string;
}

interface FactItem {
  id: string;
  title: string;
  type: 'fakta' | 'hoax';
  date: string;
  image: string;
  explanation?: string;
  reference?: string;
  author?: string;
}

// --- Mock Data ---

const MOCK_DRUGS: Drug[] = [
  {
    id: '1',
    name: 'Acarbose Tablet 50 mg',
    generic: 'Akarbosa',
    genericEn: 'Acarbose',
    code: 'T-ACAR-50',
    composition: 'Acarbose 50mg',
    description: 'Obat antidiabetik golongan inhibitor alfa-glukosidase.',
    indication: 'Diabetes Melitus Tipe 2',
    sideEffects: 'Perut kembung, diare, nyeri perut.',
    kfa: '-',
    therapyClass: 'Antidiabetik',
    atc: '-',
    patientPreg: 'B',
    medRoutes: 'Oral',
    segmentation: 'Obat Keras',
    ven: '-',
    instruction: 'Diminum bersama suapan pertama makanan.',
    reference: 'BPOM'
  },
  {
    id: '2',
    name: 'Acebutolol (Beta-Blocker Cardio-Selective)',
    generic: 'Acebutolol',
    genericEn: 'Acebutolol',
    code: 'T-ACEB-CS',
    composition: 'Acebutolol',
    description: 'Obat golongan beta-blocker selektif.',
    indication: 'Hipertensi, Aritmia',
    sideEffects: 'Kelelahan, pusing, gangguan tidur.',
    kfa: '-',
    therapyClass: 'Antihipertensi',
    atc: '-',
    patientPreg: 'B',
    medRoutes: 'Oral',
    segmentation: 'Obat Keras',
    ven: '-',
    instruction: '-',
    reference: 'MIMS'
  },
  {
    id: '3',
    name: 'Acetaminophen',
    generic: 'Parasetamol',
    genericEn: 'Acetaminophen',
    code: 'T-PARA-500',
    composition: 'Parasetamol 500mg',
    description: 'Analgesik dan antipiretik.',
    indication: 'Demam, Nyeri ringan sampai sedang',
    sideEffects: 'Jarang, kerusakan hati pada dosis tinggi.',
    kfa: '-',
    therapyClass: 'Analgesik',
    atc: '-',
    patientPreg: 'B',
    medRoutes: 'Oral',
    segmentation: 'Obat Bebas',
    ven: '-',
    instruction: '-',
    reference: 'BPOM'
  },
  {
    id: '4',
    name: 'Asam Folat',
    generic: 'Asam Folat',
    genericEn: 'Folic Acid',
    code: 'T-ASAMF-24-769',
    composition: '-',
    description: '-',
    indication: '-',
    sideEffects: '-',
    kfa: '-',
    therapyClass: '-',
    atc: '-',
    patientPreg: '-',
    medRoutes: '-',
    segmentation: '-',
    ven: '-',
    instruction: '-',
    reference: '-'
  },
  {
    id: '5',
    name: 'Asam Mefenamat (NSAID)',
    generic: 'Asam Mefenamat',
    genericEn: 'Mefenamic Acid',
    code: 'T-ASAMM-500',
    composition: 'Asam Mefenamat 500mg',
    description: 'Obat antiinflamasi nonsteroid (OAINS).',
    indication: 'Nyeri ringan sampai sedang, dismenore',
    sideEffects: 'Gangguan lambung, mual.',
    kfa: '-',
    therapyClass: 'Analgesik/NSAID',
    atc: '-',
    patientPreg: 'C',
    medRoutes: 'Oral',
    segmentation: 'Obat Keras',
    ven: '-',
    instruction: 'Diminum sesudah makan.',
    reference: 'BPOM'
  },
  {
    id: '6',
    name: 'Ascardia Tablet 80 mg',
    generic: 'Asetil Asam Salisilat',
    genericEn: 'Aspirin',
    code: 'T-ASCA-80',
    composition: 'Aspirin 80mg',
    description: 'Antiplatelet.',
    indication: 'Pencegahan stroke dan serangan jantung.',
    sideEffects: 'Iritasi lambung, risiko perdarahan.',
    kfa: '-',
    therapyClass: 'Antiplatelet',
    atc: '-',
    patientPreg: 'D',
    medRoutes: 'Oral',
    segmentation: 'Obat Keras',
    ven: '-',
    instruction: '-',
    reference: 'BPOM'
  }
];

const MOCK_FACTS: FactItem[] = [
  { 
    id: 'f1', 
    title: 'Apakah kita harus menghentikan penggunaan alkohol ketika mengkonsumsi obat?', 
    type: 'fakta', 
    date: 'about a month ago', 
    image: 'https://res.cloudinary.com/ddhcevbej/image/upload/v1770972285/013_iyj6h4.jpg',
    explanation: `Beberapa obat dan alkohol dapat berinteraksi seperti berikut:
• Alkohol dapat meningkatkan efek obat penenang, antidepresan, dan obat antikonvulsan. Hal ini dapat menyebabkan efek samping yang serius, seperti depresi pernapasan, koma, dan bahkan kematian.
• Alkohol dapat meningkatkan risiko pendarahan internal saat dikonsumsi dengan obat antikoagulan seperti warfarin. Asupan alkohol akut dapat meningkatkan antikoagulasi dengan menurunkan metabolisme warfarin; konsumsi alkohol kronis menurunkan antikoagulasi dengan meningkatkan metabolisme warfarin.(Weathermon & Crabb, 1999).
• Alkohol dapat meningkatkan risiko kerusakan hati saat dikonsumsi dengan obat-obatan yang hepatotoksik, seperti acetaminophen. Alkohol mengalami jalur metabolisme oksidatif di hepatosit, menyebabkan penurunan rasio nikotinamida adenin dinukleotida (NAD) terhadap NADH. Ini mendorong lipogenesis dengan menghambat oksidasi trigliserida dan asam lemak. Mekanisme lain yang diketahui mengenai kerusakan hati akibat alkohol adalah translokasi endotoksin dalam bentuk lipopolisakarida (LPS), dari usus ke dalam hepatosit (Shah et al., 2024).`,
    reference: `1. Shah, N. J., Royer, A., & John, S. (2024). Alcoholic Hepatitis.
2. Weathermon, R., & Crabb, D. W. (1999). Alcohol and medication interactions. Alcohol Research & Health : The Journal of the National Institute on Alcohol Abuse and Alcoholism, 23(1), 40–54.`,
    author: 'Putriana Rachmawati, M.Si'
  },
  { 
    id: 'f2', 
    title: 'Apakah Boleh Mengkombinasikan Obat Sendiri?', 
    type: 'hoax', 
    date: 'about a month ago', 
    image: 'https://res.cloudinary.com/ddhcevbej/image/upload/v1770972284/012_yild2p.jpg',
    explanation: `Jangan sembarang mengkombinasi obat: hati -hati! Kenali interaksi yang merugikan!
Tahukah anda, bahwa dua atau lebih obat yang diberikan pada waktu bersamaan dapat mempengaruhi efek masing-masing atau saling berinteraksi. Interaksi tersebut dapat bersifat potensiasi atau antagonis satu obat oleh obat lainnya, atau kadang dapat memberikan efek yang lain. Dengan kata lain, efek interaksi obat dapat menguntungkan atau merugikan terapi (Baxter, 2010). Meskipun potensi interaksi tidak selalu berdampak pada gejala klinik yang dapat diamati, potensi terjadinya interaksi sebaiknya diminimalkan dan dicegah.
(Selengkapnya cek artikel)`,
    reference: `1. Armahizer M, Kane-Gill SL, Smithburger PL dkk (2012). Comparing drug-drug interactions severity for clinician opnion to proprietary data bases. Adc Pharmacoepidem Drug Saf. 1: 4
2. Baxter, K. (2010). Stockley’s Drug Interaction. A source book of Interaction, their mechanisms, clinical importance and management. 9th ed. London Pharmaceutical Press, UK
3. Leone R, Magro L, Moretti U dkk (2010) Identifiying adverse drug reactions associated with drug drug interactions: data mining of a spontaneous reporting database in Italy.
4. Phansalkar S, Desa A, Choksi A dkk (2013) Criteria for assessing high priority drug-drug interactions for clinical decision support in electronic health records. BMC Med Inform decision Making`,
    author: 'Dr. apt. Lusy Noviani, MM '
  },
  { 
    id: 'f3', 
    title: 'Apakah boleh meningkatkan obat nyeri secara terus menerus?', 
    type: 'hoax', 
    date: 'about a month ago', 
    image: 'https://res.cloudinary.com/ddhcevbej/image/upload/v1770972283/011_u6eibt.jpg',
    explanation: `Pemilihan obat pereda nyeri, tergantung dari jenis nyerinya dan penyebab serta tingkat keparahan. Obat analgesik di apotek umumnya dapat mengatasi berbagai jenis nyeri, terutama yang ringan hingga sedang. Namun, jika obat tersebut tak cukup menghilangkan rasa nyeri atau nyeri yang ada hilang timbul dalam jangka waktu lama, maka penggunaan obat nyeri secara terus menerus akan menyebabkan tubuh menjadi resisten, kok bisa?
Saat nyeri, maka otak akan memproduksi zat kimiawi yang menyebabkan kita merasakan rasa sakit tersebut. Obat analgesik bekerja menghentikan otak memproduksi zat tersebut. Namun jika sering mengonsumsi obat analgesik, maka tubuh akan beradaptasi dan tidak mampu menghentikan zat kimiawi yang dihasilkan otak tersebut, sehingga kecenderungannya, jumlah maupun dosis obat nyeri akan dikonsumsi lebih tinggi, yang menyebabkan keluhan lain bermunculan seperti mual, diare, kembung dll
Ibarat 2 sisi mata uang, obat nyeri memiliki efek baik dan buruk, gunakan dengan bijak!`,
    reference: `Suwondo BS, Meliala L, Sudadi. (2017). Buku Ajar Nyeri. Indonesia Pain Society`,
    author: 'Dr. apt. Lusy Noviani, MM '
  },
  { 
    id: 'f4', 
    title: 'Apakah semua jenis obat batuk sama?', 
    type: 'hoax', 
    date: 'about a month ago', 
    image: 'https://res.cloudinary.com/ddhcevbej/image/upload/v1770972286/010_fnqpyh.jpg', 
    explanation: `Tidak semua obat batuk diciptakan sama karena jenis batuk pun berbeda-beda. Secara umum ada dua jenis utama:
1. Ekspektoran: Untuk batuk berdahak, bekerja dengan mengencerkan dahak agar mudah dikeluarkan.
2. Antitusif: Untuk batuk kering, bekerja dengan menekan refleks batuk di otak.

Menggunakan antitusif untuk batuk berdahak justru berbahaya karena dahak akan tertahan di paru-paru dan bisa memicu infeksi.`, 
    reference: `1. MIMS Indonesia. Cough and Cold Preparations.
2. WebMD. Cough Medicine: Understanding Your Options.
3. BPOM RI. Cerdas Memilih Obat Batuk.`, 
    author: 'Tim Farmasi' 
  },
  { 
    id: 'f5', 
    title: 'Apakah kerokan dapat mengobati penyakit?', 
    type: 'fakta', 
    date: 'about a month ago', 
    image: 'https://res.cloudinary.com/ddhcevbej/image/upload/v1770972281/009_ncmin9.jpg', 
    explanation: `Kerokan adalah terapi tradisional yang secara medis diakui memiliki efek tertentu pada tubuh, namun bukan "obat" untuk semua penyakit. 

Secara ilmiah, kerokan menyebabkan:
1. Vasodilatasi: Pelebaran pembuluh darah di area yang dikerok, meningkatkan aliran darah.
2. Efek Anti-inflamasi: Memicu respon imun ringan yang membantu relaksasi otot.
3. Peningkatan Endorfin: Memberikan rasa nyaman dan mengurangi nyeri otot (pegal-pegal).

Namun, kerokan tidak disarankan untuk penderita gangguan pembuluh darah atau kulit sensitif.`, 
    reference: `1. Jurnal Keperawatan Indonesia. Efek Fisiologis Terapi Kerokan.
2. Penelitian Prof. Dr. Didik Gunawan Tamtomo (UNS).
3. Traditional Chinese Medicine (Gua Sha) Research.`, 
    author: 'Peneliti Kesehatan Tradisional' 
  },
  { 
    id: 'f6', 
    title: 'Apakah obat golongan statin menyebabkan risiko kerusakan hati?', 
    type: 'fakta', 
    date: 'about a month ago', 
    image: 'https://res.cloudinary.com/ddhcevbej/image/upload/v1770972279/006_qmzqzi.jpg', 
    explanation: `Obat golongan statin (penurun kolesterol) memang memiliki risiko efek samping pada hati, namun frekuensinya sangat jarang (kurang dari 1% pengguna). 

Penting untuk diketahui:
1. Statin dapat menyebabkan peningkatan enzim hati pada beberapa orang.
2. Dokter biasanya melakukan tes fungsi hati (SGOT/SGPT) sebelum dan selama terapi.
3. Manfaat statin dalam mencegah serangan jantung dan stroke jauh lebih besar daripada risiko kerusakan hati bagi kebanyakan pasien.`, 
    reference: `1. American Heart Association (AHA). Statin Safety and Side Effects.
2. FDA Drug Safety Communication.
3. Jurnal Kardiologi Indonesia.`, 
    author: 'Spesialis Jantung & Pembuluh Darah' 
  },
];

const BUD_CATEGORIES = [
  'Cream', 'Gel', 'Salep', 'Losion', 'Gel Sheet', 'Emulgel', 'Larutan', 'Enema', 'Emulsi', 'Eliksir', 'Suspensi'
];

const SOLVENTS = [
  'Dekstrosa 5% dalam air (D5W)',
  'Normal Saline (NS)',
  'Normal Saline Ringer\'s Laktat (NSRL)',
  'Pelarut original',
  'Ringer\'s Lactat (RL)',
  'Sterile water for injection (SWFI)'
];

const CONCENTRATIONS = [
  '0,25-5 mg/ml',
  '40mg/ml dalam 50-200ml',
  '5mg/ml',
  '500mg/10ml; 1g/20ml',
  '1g/50ml',
  '100mg/ml'
];

// --- Components ---

const Header = ({ title, onBack }: { title: string; onBack?: () => void }) => (
  <div className="flex items-center p-4 bg-white sticky top-0 z-10">
    {onBack && (
      <button onClick={onBack} className="mr-4 p-1 hover:bg-gray-100 rounded-full transition-colors">
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
    )}
    <h1 className="text-xl font-bold text-gray-800 flex-1 text-center">{title}</h1>
    {onBack && <div className="w-6" />} {/* Spacer for centering */}
  </div>
);

const SearchBar = ({ value, onChange, placeholder = "Search here..." }: { value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div className="relative mx-4 my-2">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all text-gray-700"
    />
    {value && (
      <button onClick={() => onChange('')} className="absolute right-3 top-1/2 -translate-y-1/2">
        <X className="w-5 h-5 text-gray-400" />
      </button>
    )}
  </div>
);

const GradientCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-gradient-to-r from-pink-200 to-blue-400 rounded-3xl p-6 shadow-lg shadow-blue-100/50 ${className}`}>
    {children}
  </div>
);

export default function App() {
  const [view, setView] = useState<View>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [drugs, setDrugs] = useState<Drug[]>(DRUG_DATA);
  const [interactions, setInteractions] = useState<Interaction[]>(INTERACTION_DATA);
  const [facts, setFacts] = useState<FactItem[]>(MOCK_FACTS);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [selectedFact, setSelectedFact] = useState<FactItem | null>(null);
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const [selectedBUD, setSelectedBUD] = useState<BUDItem | null>(null);
  const [selectedCompatibility, setSelectedCompatibility] = useState<CompatibilityItem | null>(null);
  const [interactionList, setInteractionList] = useState<Drug[]>([]);
  const [showInteractionSearch, setShowInteractionSearch] = useState(false);
  const [interactionResult, setInteractionResult] = useState<Interaction | null>(null);
  const [googleSheetUrl, setGoogleSheetUrl] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState(false);

  // --- Excel Import Handler ---

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      
      // Handle Drugs Sheet
      const drugSheetName = wb.SheetNames.find(n => n.toLowerCase().includes('obat')) || wb.SheetNames[0];
      const drugWs = wb.Sheets[drugSheetName];
      const drugData = XLSX.utils.sheet_to_json(drugWs) as any[];

      const importedDrugs: Drug[] = drugData.map((item, index) => ({
        id: `imported-${index}`,
        name: item['Nama obat'] || item['name'] || 'Unknown',
        generic: item['Nama generik (Indonesia)'] || item['generic'] || '-',
        genericEn: item['Nama generik (English)'] || item['genericEn'] || '-',
        composition: item['Komposisi'] || item['composition'] || '-',
        description: item['Deskripsi (description)'] || item['description'] || '-',
        indication: item['Indikasi (med. function)'] || item['indication'] || '-',
        sideEffects: item['Efek samping'] || item['sideEffects'] || '-',
        therapyClass: item['Kelas Terapi'] || item['therapyClass'] || '-',
        atc: item['ATC (not required)'] || item['atc'] || '-',
        patientPreg: item['Patient preg'] || item['patientPreg'] || '-',
        medRoutes: item['Med routes'] || item['medRoutes'] || '-',
        segmentation: item['SEGMENTATION'] || item['segmentation'] || '-',
        instruction: item['Add instruction'] || item['instruction'] || '-',
        reference: item['Referensi'] || item['reference'] || '-',
      }));

      // Handle Interaction Sheet
      const interactionSheetName = wb.SheetNames.find(n => n.toLowerCase().includes('interaksi'));
      if (interactionSheetName) {
        const interactionWs = wb.Sheets[interactionSheetName];
        const interactionData = XLSX.utils.sheet_to_json(interactionWs) as any[];
        const importedInteractions: Interaction[] = interactionData.map(item => ({
          obat1: item['Obat 1 (item name)'] || item['Obat1'] || item['obat1'] || '',
          obat2: item['Obat 2 (obat yang berinteraksi)'] || item['Obat2'] || item['obat2'] || '',
          keterangan: item['Keterangan (catatan)'] || item['keterangan'] || item['Keterangan'] || '',
          severity: 'yellow'
        }));
        setInteractions(importedInteractions);
      }

      // Handle Fact Check Sheet
      const factSheetName = wb.SheetNames.find(n => n.toLowerCase().includes('cek fakta'));
      if (factSheetName) {
        const factWs = wb.Sheets[factSheetName];
        const factData = XLSX.utils.sheet_to_json(factWs) as any[];
        const importedFacts: FactItem[] = factData
          .filter(item => item['Judul'] || item['judul'])
          .map((item, index) => ({
            id: `imported-fact-${index}`,
            title: item['Judul'] || item['judul'] || 'Unknown Title',
            type: (item['Fakta/hoax'] || item['Type'] || '').toLowerCase().includes('hoax') ? 'hoax' : 'fakta',
            explanation: item['Penjelasan artikel'] || item['Penjelasan'] || item['explanation'] || '-',
            reference: item['Referensi'] || item['reference'] || '-',
            author: item['Penulis'] || item['author'] || '-',
            date: item['Tanggal'] || item['date'] || 'Recently',
            image: item['gambar '] || item['gambar'] || item['image'] || `https://picsum.photos/seed/fact-${index}/400/200`
          }));
        setFacts(importedFacts);
      }

      if (importedDrugs.length > 0 || factSheetName) {
        setDrugs(importedDrugs.length > 0 ? importedDrugs : drugs);
        alert(`Data berhasil diimpor!\n- ${importedDrugs.length} Obat\n- ${factSheetName ? 'Data Cek Fakta tersedia' : 'Data Cek Fakta tidak ditemukan'}\n- ${interactionSheetName ? 'Data Interaksi tersedia' : 'Data Interaksi tidak ditemukan'}`);
        setView('home');
      }
    };
    reader.readAsBinaryString(file);
  };

  const syncFromGoogleSheet = async () => {
    if (!googleSheetUrl) {
      alert('Silakan masukkan URL Google Sheet');
      return;
    }

    setIsSyncing(true);
    try {
      const sheetIdMatch = googleSheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (!sheetIdMatch) throw new Error("URL Google Sheet tidak valid");
      const sheetId = sheetIdMatch[1];
      
      // Fetch "Cek fakta" sheet
      const factUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=Cek%20fakta`;
      const factResponse = await fetch(factUrl);
      const factCsv = await factResponse.text();
      
      const factWb = XLSX.read(factCsv, { type: 'string' });
      const factData = XLSX.utils.sheet_to_json(factWb.Sheets[factWb.SheetNames[0]]) as any[];
      
      const importedFacts = factData
        .filter(item => item['Judul'] || item['judul'])
        .map((item, index) => ({
          id: `fact-${index}`,
          title: item['Judul'] || item['judul'],
          explanation: item['Penjelasan artikel'] || item['penjelasan artikel'] || '',
          reference: item['Referensi'] || item['referensi'] || '',
          author: item['Penulis'] || item['penulis'] || '',
          date: new Date().toLocaleDateString('id-ID'),
          type: 'fakta',
          image: item['gambar '] || item['gambar'] || item['image'] || `https://picsum.photos/seed/fact-${index}/400/200`
        }));

      // Fetch "Obat" sheet (optional, but good for completeness)
      const drugUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=Obat`;
      try {
        const drugResponse = await fetch(drugUrl);
        if (drugResponse.ok) {
          const drugCsv = await drugResponse.text();
          const drugWb = XLSX.read(drugCsv, { type: 'string' });
          const drugData = XLSX.utils.sheet_to_json(drugWb.Sheets[drugWb.SheetNames[0]]) as any[];
          
          const importedDrugs = drugData.map((item, index) => ({
            id: `drug-${index}`,
            name: item['Nama obat'] || item['nama obat'] || '',
            code: item['Kode obat'] || '',
            generic: item['Nama generik'] || '',
            genericEn: item['Nama generik (English)'] || '',
            composition: item['Komposisi'] || '',
            description: item['Deskripsi'] || '',
            indication: item['Indikasi'] || '',
            sideEffects: item['Efek samping'] || '',
            kfa: item['KFA'] || '',
            therapyClass: item['Kelas Terapi'] || '',
            atc: item['ATC'] || '',
            patientPreg: item['Patient preg'] || '',
            medRoutes: item['Med routes'] || '',
            segmentation: item['Segmentation'] || '',
            ven: item['Ven'] || '',
            instruction: item['Add Instruction'] || '',
            reference: item['Referensi'] || '',
          }));
          if (importedDrugs.length > 0) setDrugs(importedDrugs);
        }
      } catch (e) {
        console.log("Sheet 'Obat' not found or inaccessible");
      }

      if (importedFacts.length > 0) {
        setFacts(importedFacts);
        alert(`Berhasil sinkronisasi!\n- ${importedFacts.length} Artikel Cek Fakta diimpor.`);
        setView('home');
      } else {
        alert("Data tidak ditemukan di sheet 'Cek fakta'. Pastikan sheet tersebut ada dan memiliki kolom 'Judul'.");
      }
    } catch (error: any) {
      alert(`Gagal sinkronisasi: ${error.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  // --- View Handlers ---

  const renderHome = () => (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            <img 
              src="https://picsum.photos/seed/user-avatar/100/100" 
              alt="User" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Halo sahabat peduli obat!</h2>
            <p className="text-xs text-gray-500">Jakarta, Indonesia</p>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="relative overflow-hidden h-48 rounded-3xl shadow-lg">
          <img 
            src="https://res.cloudinary.com/ddhcevbej/image/upload/v1772946180/02_gc0ukq.png" 
            alt="Solusi kesehatan modern" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="p-6">
        <h4 className="text-gray-600 font-semibold mb-4">Get you want it</h4>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'info', label: '', img: 'https://res.cloudinary.com/ddhcevbej/image/upload/v1772946179/03_karrgm.png' },
            { id: 'interaction', label: '', img: 'https://res.cloudinary.com/ddhcevbej/image/upload/v1772946179/04_p0vhtb.png' },
            { id: 'fact', label: '', img: 'https://res.cloudinary.com/ddhcevbej/image/upload/v1772946180/05_jvwqfu.png' },
            { id: 'regulation', label: '', img: 'https://res.cloudinary.com/ddhcevbej/image/upload/v1772946182/06_ef5mpk.png' },
            { id: 'bud', label: '', img: 'https://res.cloudinary.com/ddhcevbej/image/upload/v1772946181/07_tu6hzw.png' },
            { id: 'compatibility', label: '', img: 'https://res.cloudinary.com/ddhcevbej/image/upload/v1772946183/08_kccie7.png' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-95 group"
            >
              <img 
                src={item.img} 
                alt={item.id} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {item.label && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex flex-col justify-end p-4">
                  <span className="text-xs font-bold text-white text-center leading-tight drop-shadow-sm">{item.label}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDrugInfo = () => {
    if (selectedDrug) {
      return (
        <div className="bg-white min-h-screen">
          <Header title="Informasi Obat" onBack={() => setSelectedDrug(null)} />
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{selectedDrug.name}</h2>
            {[
              { label: 'Kode Obat', value: selectedDrug.code },
              { label: 'Nama generik', value: selectedDrug.generic },
              { label: 'Nama generik (English)', value: selectedDrug.genericEn },
              { label: 'Komposisi', value: selectedDrug.composition },
              { label: 'Deskripsi', value: selectedDrug.description },
              { label: 'Indikasi', value: selectedDrug.indication },
              { label: 'Efek samping', value: selectedDrug.sideEffects },
              { label: 'KFA', value: selectedDrug.kfa },
              { label: 'Kelas Terapi', value: selectedDrug.therapyClass },
              { label: 'ATC', value: selectedDrug.atc },
              { label: 'Patient preg', value: selectedDrug.patientPreg },
              { label: 'Med routes', value: selectedDrug.medRoutes },
              { label: 'Segmentation', value: selectedDrug.segmentation },
              { label: 'Ven', value: selectedDrug.ven },
              { label: 'Add Instruction', value: selectedDrug.instruction },
              { label: 'Referensi', value: selectedDrug.reference },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-sm font-bold text-gray-800">{item.label} :</p>
                <p className="text-sm text-gray-500">{item.value || '-'}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const filteredDrugs = drugs.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.generic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="bg-white min-h-screen">
        <Header title="Informasi Obat" onBack={() => setView('home')} />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="p-4 space-y-4">
          {filteredDrugs.map(drug => (
            <button
              key={drug.id}
              onClick={() => setSelectedDrug(drug)}
              className="w-full bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-1 h-12 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full" />
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{drug.name}</h3>
                  <p className="text-xs text-gray-400">{drug.generic}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-400" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderInteraction = () => {
    const filteredDrugs = drugs.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const checkInteraction = () => {
      if (interactionList.length < 2) return;
      
      const drug1 = interactionList[0].name.toLowerCase();
      const drug2 = interactionList[1].name.toLowerCase();

      const found = interactions.find(inter => {
        const o1 = inter.obat1.toLowerCase();
        const o2 = inter.obat2.toLowerCase();
        
        if (!o1 || !o2) return false;

        // Match if selected drug contains sheet drug name OR vice versa
        const match1 = (drug1.includes(o1) || o1.includes(drug1)) && (drug2.includes(o2) || o2.includes(drug2));
        const match2 = (drug1.includes(o2) || o2.includes(drug1)) && (drug2.includes(o1) || o1.includes(drug2));
        
        return match1 || match2;
      });

      if (found && found.keterangan && found.keterangan.trim() !== "") {
        setInteractionResult({
          ...found,
          severity: 'red'
        });
      } else {
        setInteractionResult({
          obat1: interactionList[0].name,
          obat2: interactionList[1].name,
          keterangan: 'tidak berinteraksi',
          severity: 'green'
        });
      }
    };

    return (
      <div className="bg-white min-h-screen">
        <Header title="Interaksi Obat" onBack={() => setView('home')} />
        
        <div className="px-4">
          <GradientCard className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter a drug, OTC or herbal supple..."
                className="w-full bg-white rounded-xl py-3 px-4 pr-10 text-sm focus:outline-none"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowInteractionSearch(true);
                }}
              />
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2 text-white/80 text-[10px]">
              <AlertCircle className="w-3 h-3" />
              <span>Add a second drug, OTC, or herbal</span>
            </div>

            {showInteractionSearch && searchQuery && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl z-20 max-h-60 overflow-y-auto border border-gray-100">
                {filteredDrugs.map(drug => (
                  <button
                    key={drug.id}
                    onClick={() => {
                      if (!interactionList.find(d => d.id === drug.id)) {
                        setInteractionList([...interactionList, drug]);
                      }
                      setSearchQuery('');
                      setShowInteractionSearch(false);
                      setInteractionResult(null);
                    }}
                    className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-50 last:border-0 text-sm text-gray-600"
                  >
                    {drug.name}
                  </button>
                ))}
              </div>
            )}
          </GradientCard>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-700">Resimen Pasien</h3>
            {interactionList.length > 0 && (
              <button 
                onClick={() => {
                  setInteractionList([]);
                  setInteractionResult(null);
                }}
                className="text-xs font-bold text-red-500"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-3">
            {interactionList.length === 0 ? (
              <p className="text-center text-gray-400 py-4 italic">-- Tidak ada data --</p>
            ) : (
              interactionList.map(drug => (
                <div key={drug.id} className="flex items-center gap-3">
                  <div className="flex-1 bg-white border border-blue-100 rounded-full py-3 px-6 text-blue-500 font-bold text-sm shadow-sm">
                    {drug.name}
                  </div>
                  <button 
                    onClick={() => {
                      setInteractionList(interactionList.filter(d => d.id !== drug.id));
                      setInteractionResult(null);
                    }}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>

          <button
            disabled={interactionList.length < 2}
            onClick={checkInteraction}
            className={`w-full mt-8 py-4 rounded-xl font-bold transition-all shadow-lg ${
              interactionList.length < 2 
                ? 'bg-gray-200 text-gray-400' 
                : 'bg-blue-400 text-white hover:bg-blue-500 active:scale-95'
            }`}
          >
            Cek Interaksi
          </button>

          {interactionResult && (
            <div className="mt-8">
              <h4 className="font-bold text-gray-700 mb-4">Hasil Interaksi</h4>
              <div className={`rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg border-2 ${
                interactionResult.severity === 'red' 
                  ? 'bg-white border-red-500 text-red-500' 
                  : 'bg-white border-green-500 text-green-500'
              }`}>
                <span className="font-bold text-lg text-center">{interactionResult.keterangan}</span>
                {interactionResult.severity === 'red' && (
                  <button 
                    onClick={() => setView('interaction-detail')}
                    className="mt-4 text-xs font-bold underline uppercase tracking-widest"
                  >
                    Lihat Detail
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderInteractionDetail = () => {
    if (!interactionResult) return null;
    return (
      <div className="bg-white min-h-screen">
        <Header title="Peringatan Interaksi" onBack={() => setView('interaction')} />
        <div className="p-6 space-y-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 flex flex-col items-center text-center space-y-4">
            <AlertCircle className="w-16 h-16 text-red-500" />
            <h2 className="text-2xl font-black text-red-600 uppercase tracking-wider">Interaksi Serius!</h2>
            <div className="h-1 w-24 bg-red-200 rounded-full" />
            <p className="text-lg font-bold text-gray-800">
              {interactionResult.obat1} + {interactionResult.obat2}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Keterangan Medis</h3>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-700 leading-relaxed italic">
                "{interactionResult.keterangan}"
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Peringatan ini bersifat informatif. Harap konsultasikan dengan dokter atau apoteker sebelum melakukan perubahan pada rejimen pengobatan Anda.
            </p>
          </div>

          <button 
            onClick={() => setView('interaction')}
            className="w-full py-4 bg-gray-800 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  };

  const renderFactCheck = () => {
    const filteredFacts = facts.filter(f => 
      f.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="bg-white min-h-screen">
        <Header title="Cek Fakta" onBack={() => setView('home')} />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        <div className="p-6">
          <div className="flex items-baseline justify-between mb-8">
            <h3 className="text-3xl font-black text-gray-900 tracking-tighter italic">LATEST</h3>
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Verified Content</span>
          </div>

          <div className="space-y-10">
            {filteredFacts.map((fact) => (
              <div 
                key={fact.id} 
                className="group cursor-pointer space-y-4"
                onClick={() => {
                  setSelectedFact(fact);
                  setView('fact-detail');
                }}
              >
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-blue-100/50">
                  <img src={fact.image} alt={fact.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      {fact.type}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {fact.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1">
                      <UserIcon className="w-3 h-3" />
                      {fact.author || 'Tim Medis'}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>{fact.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderFactDetail = () => {
    if (!selectedFact) return null;
    return (
      <div className="bg-white min-h-screen">
        <div className="relative h-[40vh] w-full overflow-hidden">
          <img src={selectedFact.image} alt={selectedFact.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />
          <button 
            onClick={() => setView('fact')}
            className="absolute top-12 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 -mt-20 relative z-10 pb-12">
          <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-blue-900/10 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {selectedFact.type}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{selectedFact.date}</span>
              </div>
              <h2 className="text-3xl font-black text-gray-900 leading-[0.95] tracking-tighter italic uppercase">
                {selectedFact.title}
              </h2>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Penulis</p>
                  <p className="text-xs font-bold text-gray-800">{selectedFact.author || 'Tim Medis Tentang Obatku'}</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full" />

            <div className="space-y-4">
              <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Penjelasan Artikel</h3>
              <div className="text-gray-700 leading-relaxed space-y-4 text-sm whitespace-pre-line">
                {selectedFact.explanation}
              </div>
            </div>

            {selectedFact.reference && (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-3">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  Referensi
                </h3>
                <p className="text-xs text-gray-600 italic leading-relaxed">
                  {selectedFact.reference}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderRegulation = () => {
    const filteredRegulations = REGULATION_DATA.filter(r => 
      r.tentang.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.nomor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="bg-white min-h-screen">
        <Header title="Regulasi" onBack={() => setView('home')} />
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Cari berdasarkan judul atau nomor..." 
        />
        
        <div className="p-4 space-y-4">
          {filteredRegulations.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400">Regulasi tidak ditemukan</p>
            </div>
          ) : (
            filteredRegulations.map((reg) => (
              <button
                key={reg.no}
                onClick={() => {
                  setSelectedRegulation(reg);
                  setView('regulation-detail');
                }}
                className="w-full bg-white border border-gray-100 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-all text-left group"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">
                      {reg.jenis}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      No. {reg.nomor} Th. {reg.tahun}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    {reg.tentang}
                  </h3>
                  <p className="text-[10px] text-gray-400 italic">Status: {reg.status}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-300 mt-1" />
              </button>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderRegulationDetail = () => {
    if (!selectedRegulation) return null;
    return (
      <div className="bg-white min-h-screen">
        <Header title="Detail Regulasi" onBack={() => setView('regulation')} />
        <div className="p-6 space-y-8">
          <div className="bg-blue-50 rounded-3xl p-8 flex flex-col items-center text-center space-y-4 border border-blue-100">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-black text-blue-600 uppercase tracking-wider">{selectedRegulation.jenis}</h2>
              <p className="text-sm font-bold text-gray-500">Nomor {selectedRegulation.nomor} Tahun {selectedRegulation.tahun}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tentang / Subyek</h3>
              <p className="text-lg font-bold text-gray-800 leading-snug">
                {selectedRegulation.tentang}
              </p>
            </div>

            <div className="h-px bg-gray-100 w-full" />

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</h3>
                <p className="text-sm font-bold text-gray-700">{selectedRegulation.status}</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tag</h3>
                <p className="text-sm font-bold text-gray-700">{selectedRegulation.tag || '-'}</p>
              </div>
            </div>

            {selectedRegulation.link && (
              <div className="pt-4">
                <a 
                  href={selectedRegulation.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
                >
                  <Upload className="w-5 h-5 rotate-90" />
                  Unduh / Lihat Dokumen
                </a>
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-400 flex-shrink-0" />
            <p className="text-[10px] text-gray-500 leading-relaxed">
              Data regulasi ini bersumber dari JDIH Kemenkes, BPOM, dan sumber resmi lainnya. Pastikan untuk selalu memverifikasi status keberlakuan peraturan terbaru.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderBUD = () => {
    const filteredBUD = BUD_DATA.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.genericId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="bg-white min-h-screen">
        <Header title="Beyond Use Date" onBack={() => setView('home')} />
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Cari nama item atau generik..." 
        />
        
        <div className="p-4 space-y-4">
          <div className="bg-blue-50 rounded-2xl p-4 mb-6">
            <p className="text-xs text-blue-700 leading-relaxed italic">
              "Beyond Use Date (BUD) adalah batas waktu penggunaan produk obat setelah diracik/disiapkan atau setelah kemasan primernya dibuka/dirusak."
            </p>
          </div>

          {filteredBUD.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400">Data tidak ditemukan</p>
            </div>
          ) : (
            filteredBUD.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedBUD(item);
                  setView('bud-detail');
                }}
                className="w-full bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Calendar className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">
                      {item.dosageForm}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-300" />
              </button>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderBUDDetail = () => {
    if (!selectedBUD) return null;
    return (
      <div className="bg-white min-h-screen">
        <Header title="Detail BUD" onBack={() => setView('bud')} />
        <div className="p-6 space-y-8">
          <div className="bg-blue-50 rounded-3xl p-8 flex flex-col items-center text-center space-y-4 border border-blue-100">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-black text-blue-600 uppercase tracking-wider">{selectedBUD.name}</h2>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{selectedBUD.dosageForm}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Beyond Use Date (BUD)</h3>
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4">
                  <p className="text-blue-700 font-bold leading-relaxed">
                    {selectedBUD.bud}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Penyimpanan</h3>
                <p className="text-sm text-gray-700 font-medium">{selectedBUD.storage}</p>
              </div>

              <div className="h-px bg-gray-100 w-full" />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nama Generik</h3>
                  <p className="text-xs font-bold text-gray-700">{selectedBUD.genericId}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Generic Name (EN)</h3>
                  <p className="text-xs font-bold text-gray-700">{selectedBUD.genericEn}</p>
                </div>
              </div>

              {selectedBUD.note && (
                <div className="space-y-1">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Keterangan</h3>
                  <p className="text-xs text-gray-600 italic">{selectedBUD.note}</p>
                </div>
              )}

              <div className="space-y-1">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Referensi</h3>
                <p className="text-xs text-gray-500">{selectedBUD.reference}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-400 flex-shrink-0" />
            <p className="text-[10px] text-gray-500 leading-relaxed">
              Data BUD ini bersifat panduan umum. Selalu periksa instruksi khusus pada kemasan obat atau tanyakan kepada apoteker Anda untuk informasi yang lebih spesifik.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderCompatibility = () => {
    const filteredCompatibility = COMPATIBILITY_DATA.filter(item => 
      item.genericId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.genericEn.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="bg-white min-h-screen">
        <Header title="Tabel Kompatibilitas" onBack={() => setView('home')} />
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Cari nama obat (Amikasin, Gentamisin...)" 
        />
        
        <div className="p-4 space-y-4">
          <div className="bg-blue-50 rounded-2xl p-4 mb-6">
            <p className="text-xs text-blue-700 leading-relaxed italic">
              "Tabel ini menunjukkan kompatibilitas obat suntik dengan berbagai pelarut serta stabilitasnya setelah pencampuran."
            </p>
          </div>

          {filteredCompatibility.length === 0 ? (
            <div className="text-center py-12">
              <TableIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400">Data tidak ditemukan</p>
            </div>
          ) : (
            filteredCompatibility.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedCompatibility(item);
                  setView('compatibility-detail');
                }}
                className="w-full bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <TableIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
                      {item.genericId}
                    </h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">
                      {item.solvent}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${
                    item.compatibility === 'Kompatibel' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {item.compatibility}
                  </span>
                  <ArrowRight className="w-4 h-4 text-blue-300" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderCompatibilityDetail = () => {
    if (!selectedCompatibility) return null;
    return (
      <div className="bg-white min-h-screen">
        <Header title="Analisis Kompatibilitas" onBack={() => setView('compatibility')} />
        <div className="p-6 space-y-8">
          <div className="bg-blue-50 rounded-3xl p-8 flex flex-col items-center text-center space-y-4 border border-blue-100">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <TableIcon className="w-8 h-8 text-blue-500" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-black text-blue-600 uppercase tracking-wider">{selectedCompatibility.genericId}</h2>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{selectedCompatibility.genericEn}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Kompatibilitas</h3>
                <div className={`border rounded-2xl p-4 flex items-center gap-3 ${
                  selectedCompatibility.compatibility === 'Kompatibel' 
                    ? 'bg-green-50 border-green-100 text-green-700' 
                    : 'bg-red-50 border-red-100 text-red-700'
                }`}>
                  {selectedCompatibility.compatibility === 'Kompatibel' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <p className="font-bold">{selectedCompatibility.compatibility}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pelarut</h3>
                  <p className="text-sm font-bold text-gray-700">{selectedCompatibility.solvent}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Konsentrasi</h3>
                  <p className="text-sm font-bold text-gray-700">{selectedCompatibility.concentration}</p>
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full" />

              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stabilitas dalam Campuran</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedCompatibility.stability}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Penyimpanan</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedCompatibility.storage}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Referensi</h3>
                <p className="text-[10px] text-gray-500 whitespace-pre-line">{selectedCompatibility.reference}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-400 flex-shrink-0" />
            <p className="text-[10px] text-gray-500 leading-relaxed">
              Data ini bersumber dari Handbook on Injectable Drugs dan ASHP. Selalu verifikasi dengan protokol rumah sakit setempat dan instruksi produsen terbaru.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderProfile = () => (
    <div className="bg-white min-h-screen">
      <Header title="Profile & Settings" onBack={() => setView('home')} />
      <div className="p-6 space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-12 h-12 text-pink-500" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">Agus Kurniawan</h2>
            <p className="text-sm text-gray-500">healthciptaglobal@gmail.com</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-gray-700 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-green-500" />
            Data Management
          </h3>
          
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 space-y-6">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Sync from Google Sheets</h4>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Paste Google Sheet URL here..."
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={googleSheetUrl}
                  onChange={(e) => setGoogleSheetUrl(e.target.value)}
                />
                <button 
                  onClick={syncFromGoogleSheet}
                  disabled={isSyncing}
                  className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSyncing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2">
                Make sure the sheet is public or "Anyone with the link can view".
              </p>
            </div>

            <div className="h-px bg-gray-200 w-full" />

            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Manual Upload</h4>
              <label className="flex items-center justify-center gap-2 w-full bg-white border-2 border-dashed border-green-200 rounded-2xl py-8 cursor-pointer hover:bg-green-50 transition-colors group">
                <input 
                  type="file" 
                  accept=".xlsx, .xls, .csv" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-green-600">Upload Excel File</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <button className="w-full py-4 rounded-2xl bg-red-50 text-red-500 font-bold hover:bg-red-100 transition-colors">
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto h-screen bg-gray-50 flex flex-col relative overflow-hidden font-sans">
      <main className="flex-1 overflow-y-auto pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={view + (selectedDrug?.id || '')}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {view === 'home' && renderHome()}
            {view === 'info' && renderDrugInfo()}
            {view === 'interaction' && renderInteraction()}
            {view === 'interaction-detail' && renderInteractionDetail()}
            {view === 'fact' && renderFactCheck()}
            {view === 'fact-detail' && renderFactDetail()}
            {view === 'regulation' && renderRegulation()}
            {view === 'regulation-detail' && renderRegulationDetail()}
            {view === 'bud' && renderBUD()}
            {view === 'bud-detail' && renderBUDDetail()}
            {view === 'compatibility' && renderCompatibility()}
            {view === 'compatibility-detail' && renderCompatibilityDetail()}
            {view === 'profile' && renderProfile()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
