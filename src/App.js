import React, { useState, useEffect } from 'react';
import {
    Sparkles,
    Copy,
    Check,
    Download,
    BookOpen,
    Gamepad2,
    Sliders,
    FolderOpen,
    Plus,
    Trash2,
    FileJson,
    Info,
    Laptop,
    Smartphone,
    Globe,
    Sun,
    Moon
} from 'lucide-react';

const TOPICS_BY_LEVEL = {
    SD: [
        'Pecahan, Desimal & Persen',
        'Penjumlahan & Pengurangan Dasar',
        'Perkalian & Pembagian',
        'Bangun Datar & Bangun Ruang',
        'Pengukuran Waktu, Panjang & Berat',
        'Pengolahan Data Sederhana'
    ],
    SMP: [
        'Aljabar & Persamaan Linear',
        'Aritmetika Sosial (Diskon, Bunga, Pajak)',
        'Teorema Pythagoras & Geometri',
        'Sistem Persamaan Linear Dua Variabel (SPLDV)',
        'Statistika & Peluang Dasar',
        'Transformasi Geometri'
    ],
    SMA: [
        'Trigonometri & Analisis Fungsi',
        'Kalkulus (Limit, Turunan & Integral)',
        'Matriks & Vektor',
        'Persamaan & Fungsi Kuadrat',
        'Peluang & Kombinatorika',
        'Dimensi Tiga & Geometri Analitis'
    ]
};

const GRADES_BY_LEVEL = {
    SD: ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'],
    SMP: ['Kelas 7', 'Kelas 8', 'Kelas 9'],
    SMA: ['Kelas 10', 'Kelas 11', 'Kelas 12']
};

const GAME_GENRES = [
    'RPG / Fantasy Adventure',
    'Quiz Show / Trivia Challenge',
    'Puzzle & Escape Room',
    'Board Game & Strategy',
    'Tower Defense',
    '2D Platformer / Runner',
    'Simulation / Business Tycoon'
];

const DIFFICULTY_LEVELS = [
    'Mudah (Pengenalan Konsep)',
    'Sedang (Standar Kurikulum)',
    'Sulit (HOTS & Olimpiade)',
    'Adaptif (Menyesuaikan Performa Pemain)'
];

const PLATFORMS = [
    { id: 'web', name: 'Web Browser (HTML5/JS)', icon: Globe },
    { id: 'mobile', name: 'Mobile / Tablet', icon: Smartphone },
    { id: 'desktop', name: 'Desktop App', icon: Laptop }
];

const LEARNING_FEATURES = [
    'Umpan Balik Langsung (Instant Feedback)',
    'Pembahasan Soal Langkah-demi-Langkah',
    'Sistem Skor & Bintang (Star System)',
    'Leaderboard / Papan Peringkat',
    'Animasi & Visualisasi Interaktif',
    'Fitur Coretan / Scratchpad Canvas',
    'Petunjuk Bertingkat (Hint System)',
    'Laporan Progres Belajar Siswa'
];

const PRESETS = {
    sd_pecahan: {
        title: 'Petualangan Pecahan Ajaib',
        level: 'SD',
        grade: 'Kelas 4',
        topic: 'Pecahan, Desimal & Persen',
        subtopics: ['Pecahan Senilai', 'Penjumlahan Pecahan Penyebut Sama', 'Visualisasi Potongan Pizza'],
        genre: 'RPG / Fantasy Adventure',
        difficulty: 'Mudah (Pengenalan Konsep)',
        duration: '10 - 15 Menit',
        platform: 'Web Browser (HTML5/JS)',
        bloomTaxonomy: 'Aplikasi (Applying) & Pemahaman (Understanding)',
        features: ['Umpan Balik Langsung (Instant Feedback)', 'Pembahasan Soal Langkah-demi-Langkah', 'Animasi & Visualisasi Interaktif', 'Petunjuk Bertingkat (Hint System)'],
        gameRules: 'Pemain mengumpulkan kristal pecahan dengan mencocokkan nilai pecahan yang senilai. Jika salah 2 kali, sistem menampilkan animasi pemotongan kue secara visual.'
    },
    smp_aljabar: {
        title: 'Aljabar Cyberpunk Escape Room',
        level: 'SMP',
        grade: 'Kelas 8',
        topic: 'Aljabar & Persamaan Linear',
        subtopics: ['Penyederhanaan Aljabar', 'Persamaan Linear Satu Variabel (PLSV)', 'Sistem Persamaan'],
        genre: 'Puzzle & Escape Room',
        difficulty: 'Sedang (Standar Kurikulum)',
        duration: '15 - 20 Menit',
        platform: 'Web Browser (HTML5/JS)',
        bloomTaxonomy: 'Analisis (Analyzing) & Problem Solving',
        features: ['Umpan Balik Langsung (Instant Feedback)', 'Sistem Skor & Bintang (Star System)', 'Fitur Coretan / Scratchpad Canvas', 'Leaderboard / Papan Peringkat'],
        gameRules: 'Setiap ruangan terkunci oleh persamaan aljabar. Pemain harus mengisolasi variabel X untuk menemukan kombinasi kode pintu. Terdapat timer mundur 15 menit.'
    },
    sma_trigonometri: {
        title: 'Space Trigonometry Tower Defense',
        level: 'SMA',
        grade: 'Kelas 10',
        topic: 'Trigonometri & Analisis Fungsi',
        subtopics: ['Sinus, Cosinus, Tangen', 'Aturan Sinus & Cosinus', 'Kalkulasi Sudut Menembak'],
        genre: 'Tower Defense',
        difficulty: 'Sulit (HOTS & Olimpiade)',
        duration: '20 - 30 Menit',
        platform: 'Web Browser (HTML5/JS)',
        bloomTaxonomy: 'Evaluasi (Evaluating) & Evaluasi Kritis',
        features: ['Umpan Balik Langsung (Instant Feedback)', 'Pembahasan Soal Langkah-demi-Langkah', 'Animasi & Visualisasi Interaktif', 'Laporan Progres Belajar Siswa'],
        gameRules: 'Menara pertahanan membutuhkan koordinat sudut (Sin/Cos) yang tepat untuk menembak meteorit. Salah kalkulasi sudut menyebabkan jangkauan tembakan miring.'
    }
};

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [copied, setCopied] = useState(false);

    // Form State
    const [level, setLevel] = useState('SD');
    const [grade, setGrade] = useState('Kelas 4');
    const [topic, setTopic] = useState('Pecahan, Desimal & Persen');
    const [subtopics, setSubtopics] = useState(['Pecahan Senilai', 'Penjumlahan Pecahan']);
    const [newSubtopic, setNewSubtopic] = useState('');
    const [genre, setGenre] = useState('RPG / Fantasy Adventure');
    const [difficulty, setDifficulty] = useState('Mudah (Pengenalan Konsep)');
    const [duration, setDuration] = useState('10 - 15 Menit');
    const [platform, setPlatform] = useState('Web Browser (HTML5/JS)');
    const [bloomTaxonomy, setBloomTaxonomy] = useState('Aplikasi (Applying) & Pemahaman (Understanding)');
    const [selectedFeatures, setSelectedFeatures] = useState([
        'Umpan Balik Langsung (Instant Feedback)',
        'Pembahasan Soal Langkah-demi-Langkah',
        'Animasi & Visualisasi Interaktif',
        'Sistem Skor & Bintang (Star System)'
    ]);
    const [gameRules, setGameRules] = useState(
        'Pemain mengumpulkan item dengan menyelesaikan kuis matematika. Jika salah 3 kali berturut-turut, sistem memberikan hint visual.'
    );

    // Sync Grade & Topic options when Level changes
    useEffect(() => {
        setGrade(GRADES_BY_LEVEL[level][0]);
        setTopic(TOPICS_BY_LEVEL[level][0]);
    }, [level]);

    const generatedJSON = {
        metadata: {
            generator_app: "Interactive Math Game Prompt Generator",
            created_at: new Date().toISOString(),
            education_level: level,
            grade_level: grade,
            main_topic: topic,
            sub_topics: subtopics,
            target_platform: platform
        },
        system_instruction: {
            role: "Senior Educational Game Developer & Pedagogy Specialist",
            task: `Buatkan KODE LENGKAP game edukasi matematika interaktif berbasis Single-File Web HTML5 (HTML, CSS, JavaScript/Canvas terintegrasi) untuk jenjang ${level} (${grade}).`,
            output_format: "BERIKAN OUTPUT DALAM BENTUK SATU FILE HTML5 LENGKAP (<!DOCTYPE html> ... </html>) YANG SIAP SIMPAN DAN BISA DIRECTLY DIJALANKAN DI BROWSER TANPA INSTALLASI/DEPENDENSI LUAR.",
            key_requirements: [
                "WAJIB: Hasilkan kode dalam SATU FILE HTML (.html) berisi HTML, CSS (Styling/Tailwind CDN), dan JavaScript (Canvas/DOM Logic).",
                "Game harus interaktif, memiliki visualisasi matematika yang dinamis (bukan sekadar kuis pilihan ganda statis).",
                "Sediakan umpan balik langsung (instant feedback), penjelasan visual jika jawaban salah, dan efek suara/animasi interaktif.",
                "Desain UI/UX modern, intuitif, serta responsif di layar mobile maupun desktop.",
                "Game harus dapat langsung dimainkan secara lokal tanpa error saat file .html dibuka di browser."
            ]
        },
        pedagogical_framework: {
            target_level: `${level} - ${grade}`,
            main_concept: topic,
            sub_concepts: subtopics,
            bloom_taxonomy_level: bloomTaxonomy,
            learning_features: selectedFeatures,
            estimated_duration: duration
        },
        game_mechanics: {
            genre: genre,
            difficulty_curve: difficulty,
            win_condition: "Pemain menyelesaikan seluruh tahapan/level matematika atau mencapai target skor minimum.",
            lose_condition: "Pemain kehabisan nyawa/waktu sebelum menyelesaikan tantangan matematika.",
            scoring_system: "Skor dasar per jawaban benar + Bonus kecepatan (Timer) + Streak Bonus.",
            custom_rules_and_scaffolding: gameRules
        },
        sample_questions_structure: [
            {
                question_id: "Q01",
                difficulty: "Mudah",
                question_text: `Manakah dari gambar berikut yang bernilai sama dengan pecahan 1/2?`,
                visual_type: "Interactive Canvas / Pie Chart",
                options: ["2/4", "1/3", "3/8", "2/5"],
                correct_answer: "2/4",
                explanation: "Pecahan 2/4 jika disederhanakan (pembilang dan penyebut dibagi 2) akan menghasilkan 1/2.",
                scaffolding_hint: "Coba bagi kue menjadi 4 bagian sama besar dan ambil 2 potong."
            },
            {
                question_id: "Q02",
                difficulty: "Sedang",
                question_text: `Selesaikan soal operasi matematika berikut untuk membuka kunci pintu!`,
                visual_type: "Interactive Puzzle Slider",
                options: ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
                correct_answer: "Pilihan A",
                explanation: "Langkah 1: Sederhanakan bentuk pecahan/persamaan. Langkah 2: Hitung hasil akhirnya.",
                scaffolding_hint: "Gunakan fitur coretan / scratchpad di layar untuk menghitung."
            }
        ]
    };

    const applyPreset = (presetKey) => {
        const p = PRESETS[presetKey];
        if (!p) return;
        setLevel(p.level);
        setGrade(p.grade);
        setTopic(p.topic);
        setSubtopics(p.subtopics);
        setGenre(p.genre);
        setDifficulty(p.difficulty);
        setDuration(p.duration);
        setPlatform(p.platform);
        setBloomTaxonomy(p.bloomTaxonomy);
        setSelectedFeatures(p.features);
        setGameRules(p.gameRules);
    };

    const handleAddSubtopic = () => {
        if (newSubtopic.trim() && !subtopics.includes(newSubtopic.trim())) {
            setSubtopics([...subtopics, newSubtopic.trim()]);
            setNewSubtopic('');
        }
    };

    const handleRemoveSubtopic = (item) => {
        setSubtopics(subtopics.filter((s) => s !== item));
    };

    const toggleFeature = (feature) => {
        if (selectedFeatures.includes(feature)) {
            setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
        } else {
            setSelectedFeatures([...selectedFeatures, feature]);
        }
    };

    const handleCopyJSON = () => {
        const jsonString = JSON.stringify(generatedJSON, null, 2);

        // Cek apakah Navigator Clipboard API tersedia
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(jsonString)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch(() => fallbackCopyTextToClipboard(jsonString));
        } else {
            // Fallback untuk HTTP / Non-Secure Context / Browser lama
            fallbackCopyTextToClipboard(jsonString);
        }
    };

    // Fungsi Fallback menggunakan Textarea sementara
    const fallbackCopyTextToClipboard = (text) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;

        // Cegah scroll saat element dimasukkan ke DOM
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error('Gagal menyalin teks:', err);
        }

        document.body.removeChild(textArea);
    };

    const handleDownloadJSON = () => {
        const jsonStr = JSON.stringify(generatedJSON, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `math_game_prompt_${level.toLowerCase()}_${topic.toLowerCase().replace(/[^a-z0-9]/g, '_')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className={`min-h-screen transition-colors duration-200 font-sans flex flex-col ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

            {/* Top Header */}
            <header className={`sticky top-0 z-50 border-b backdrop-blur-md ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white rounded-xl shadow-md">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="font-extrabold text-base sm:text-lg leading-tight bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                                Math Game PromptGen
                            </h1>
                            <p className="text-xs text-slate-400 font-medium hidden sm:block">Generator Prompt Media Pembelajaran Matematika Interaktif</p>
                        </div>
                    </div>

                    {/* Dark/Light Mode Toggle */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`p-2 rounded-xl border transition ${isDarkMode ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
                        title="Toggle Theme"
                    >
                        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* LEFT COLUMN: Input Form Controls */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* Presets Bar */}
                        <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                            <div className="flex items-center space-x-2 mb-3 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                                <FolderOpen className="w-4 h-4" />
                                <span>Pilih Preset Cepat (Quick Start):</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                {Object.entries(PRESETS).map(([key, item]) => (
                                    <button
                                        key={key}
                                        onClick={() => applyPreset(key)}
                                        className={`text-left p-3 rounded-xl border transition-all ${isDarkMode
                                            ? 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/60 hover:border-indigo-500'
                                            : 'bg-slate-50 hover:bg-indigo-50/50 border-slate-200 hover:border-indigo-400'
                                            }`}
                                    >
                                        <div className="font-bold text-xs text-indigo-400 mb-0.5">{item.title}</div>
                                        <div className="text-[11px] text-slate-400 font-medium">
                                            {item.level} • {item.grade} • {item.genre.split('/')[0]}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 1: Target Kurikulum */}
                        <div className={`p-5 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                            <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-800/60">
                                <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
                                    <BookOpen className="w-4 h-4" />
                                </div>
                                <h2 className="font-bold text-sm text-slate-200">1. Target Kurikulum & Pendidikan</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Jenjang */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Jenjang Pendidikan</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['SD', 'SMP', 'SMA'].map((lvl) => (
                                            <button
                                                key={lvl}
                                                type="button"
                                                onClick={() => setLevel(lvl)}
                                                className={`py-2 text-xs font-bold rounded-xl border transition-all ${level === lvl
                                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                                                    : isDarkMode
                                                        ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                                                    }`}
                                            >
                                                {lvl}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Kelas */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Tingkat Kelas</label>
                                    <select
                                        value={grade}
                                        onChange={(e) => setGrade(e.target.value)}
                                        className={`w-full rounded-xl px-3 py-2 text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                                            }`}
                                    >
                                        {GRADES_BY_LEVEL[level].map((g) => (
                                            <option key={g} value={g}>{g}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Topik Matematika */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Topik Utama Matematika</label>
                                <select
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    className={`w-full rounded-xl px-3 py-2 text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                                        }`}
                                >
                                    {TOPICS_BY_LEVEL[level].map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Sub-Topik (Tags) */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Sub-Topik / Materi Spesifik</label>
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                    {subtopics.map((sub) => (
                                        <span
                                            key={sub}
                                            className="inline-flex items-center px-2.5 py-1 rounded-lg bg-indigo-950/60 text-indigo-300 border border-indigo-800/80 text-xs font-medium"
                                        >
                                            {sub}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSubtopic(sub)}
                                                className="ml-1.5 hover:text-rose-400 focus:outline-none"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newSubtopic}
                                        onChange={(e) => setNewSubtopic(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubtopic())}
                                        placeholder="Tambah sub-topik (misal: Turunan Trigono)..."
                                        className={`flex-1 rounded-xl px-3 py-1.5 text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddSubtopic}
                                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center space-x-1 transition"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>Tambah</span>
                                    </button>
                                </div>
                            </div>

                            {/* Taksonomi Bloom */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Target Taksonomi Bloom</label>
                                <input
                                    type="text"
                                    value={bloomTaxonomy}
                                    onChange={(e) => setBloomTaxonomy(e.target.value)}
                                    placeholder="Contoh: Pemahaman, Problem Solving, Analisis"
                                    className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                                        }`}
                                />
                            </div>
                        </div>

                        {/* SECTION 2: Desain & Mekanik Game */}
                        <div className={`p-5 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                            <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-800/60">
                                <div className="p-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg">
                                    <Gamepad2 className="w-4 h-4" />
                                </div>
                                <h2 className="font-bold text-sm text-slate-200">2. Desain & Mekanik Game</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Genre Game */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Genre Game</label>
                                    <select
                                        value={genre}
                                        onChange={(e) => setGenre(e.target.value)}
                                        className={`w-full rounded-xl px-3 py-2 text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                                            }`}
                                    >
                                        {GAME_GENRES.map((g) => (
                                            <option key={g} value={g}>{g}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Kesulitan */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Tingkat Kesulitan</label>
                                    <select
                                        value={difficulty}
                                        onChange={(e) => setDifficulty(e.target.value)}
                                        className={`w-full rounded-xl px-3 py-2 text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                                            }`}
                                    >
                                        {DIFFICULTY_LEVELS.map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Durasi */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Target Durasi Permainan</label>
                                    <input
                                        type="text"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        placeholder="e.g. 10 - 15 Menit"
                                        className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                                            }`}
                                    />
                                </div>

                                {/* Target Platform */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Target Platform Game</label>
                                    <select
                                        value={platform}
                                        onChange={(e) => setPlatform(e.target.value)}
                                        className={`w-full rounded-xl px-3 py-2 text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                                            }`}
                                    >
                                        {PLATFORMS.map((p) => (
                                            <option key={p.id} value={p.name}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Aturan Khusus Game */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Aturan Khusus & Scaffolding Game</label>
                                <textarea
                                    rows={2}
                                    value={gameRules}
                                    onChange={(e) => setGameRules(e.target.value)}
                                    placeholder="Contoh: Jika pemain salah 2 kali berturut-turut, berikan hint berupa penjelasan visual..."
                                    className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                                        }`}
                                />
                            </div>
                        </div>

                        {/* SECTION 3: Fitur Pembelajaran Interaktif */}
                        <div className={`p-5 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                            <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-800/60">
                                <div className="p-1.5 bg-teal-500/10 text-teal-400 rounded-lg">
                                    <Sliders className="w-4 h-4" />
                                </div>
                                <h2 className="font-bold text-sm text-slate-200">3. Fitur Pembelajaran & Umpan Balik</h2>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-2">Pilih Fitur Pedagogis yang Diaktifkan:</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {LEARNING_FEATURES.map((feat) => {
                                        const isSelected = selectedFeatures.includes(feat);
                                        return (
                                            <button
                                                key={feat}
                                                type="button"
                                                onClick={() => toggleFeature(feat)}
                                                className={`flex items-center space-x-2.5 p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${isSelected
                                                    ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                                                    : isDarkMode
                                                        ? 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800'
                                                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                                                    }`}
                                            >
                                                <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${isSelected ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-600'}`}>
                                                    {isSelected && <Check className="w-3 h-3" />}
                                                </div>
                                                <span>{feat}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Prettified JSON Code Output Preview */}
                    <div className="lg:col-span-5 flex flex-col space-y-4">
                        <div className={`sticky top-20 rounded-2xl border p-4 flex flex-col h-[calc(100vh-6.5rem)] ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-md'}`}>

                            {/* JSON Preview Header */}
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                                <div className="flex items-center space-x-2">
                                    <FileJson className="w-5 h-5 text-cyan-400" />
                                    <span className="font-bold text-xs text-slate-200 uppercase tracking-wider">JSON Prompt Preview</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={handleCopyJSON}
                                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition ${copied
                                            ? 'bg-emerald-600 text-white border-emerald-500'
                                            : isDarkMode
                                                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                                                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                                            }`}
                                    >
                                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                        <span>{copied ? 'Tersalin!' : 'Copy JSON'}</span>
                                    </button>

                                    <button
                                        onClick={handleDownloadJSON}
                                        className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-md transition"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        <span>.json</span>
                                    </button>
                                </div>
                            </div>

                            {/* Info Note */}
                            <div className={`my-3 p-3 rounded-xl border flex items-start space-x-2.5 text-xs ${isDarkMode ? 'bg-indigo-950/40 border-indigo-800/60 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-900'}`}>
                                <Info className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                                <span>Output JSON ini menyertakan instruksi agar LLM secara otomatis membuatkan game berbasis single-file web HTML5 siap pakai.</span>
                            </div>

                            {/* Prettified Syntax Display */}
                            <div className="flex-1 overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-emerald-400 leading-relaxed shadow-inner">
                                <pre className="whitespace-pre-wrap break-words">{JSON.stringify(generatedJSON, null, 2)}</pre>
                            </div>

                            {/* Footer status */}
                            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Auto HTML5 Generator Enabled
                                </span>
                                <span>{Object.keys(generatedJSON).length} Main Nodes</span>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}