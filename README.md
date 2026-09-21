# 🚀 Math Game PromptGen

Aplikasi berbasis React untuk mempermudah pendidik, pengembang game, dan instruktur dalam membuat **Prompt JSON terstruktur**. Prompt ini dirancang khusus untuk diinput ke Large Language Model (LLM) seperti ChatGPT, Claude, atau Gemini agar secara otomatis menghasilkan **Game Edukasi Matematika Interaktif berbasis Single-File Web HTML5** (HTML, CSS, JS/Canvas).

---

## ✨ Fitur Utama
* **Preset Cepat (Quick Start):** Pilihan template konfigurasi otomatis untuk jenjang SD, SMP, dan SMA.
* **Kustomisasi Kurikulum & Pedagogi:** Pengaturan tingkat kelas, topik utama, sub-topik dinamis (tagging), dan Level Taksonomi Bloom.
* **Mekanik & Desain Game Flexible:** Pemilihan genre game (RPG, Puzzle, Tower Defense, dll.), tingkat kesulitan, target durasi, dan aturan scaffolding khusus.
* **Real-time Live Preview:** Tampilan kode JSON yang ter-update secara *real-time* saat form diubah.
* **Copy & Download JSON:**
  * Fitur **Copy to Clipboard** aman (dilengkapi fungsi *fallback* untuk lingkungan HTTP/non-secure context).
  * Fitur **Download .json File** langsung ke penyimpanan lokal.
* **Auto HTML5 Engine Instruction:** Menginstruksikan LLM secara otomatis untuk membuat output berupa file tunggal `.html` interaktif tanpa dependensi eksternal.

---

## 📝 Panduan Penggunaan (Cara Generate JSON)

1. Pilih Preset (Opsional): Click salah satu kartu preset di bagian atas (contoh: Petualangan Pecahan Ajaib atau Space Trigonometry).
2. Atur Target Kurikulum:
    * Pilih Jenjang (SD, SMP, atau SMA).
    * Pilih Kelas dan Topik Utama.
    * Tambahkan Sub-Topik dengan mengetikkan nama topik lalu tekan tombol Tambah / Enter.
3. Tentukan Mekanik Game:
    * Pilih Genre Game, Tingkat Kesulitan, Durasi, dan Target Platform.
    * Isi aturan khusus (custom rules) seperti mekanisme nyawa, skor, atau bantuan (scaffolding).
4. Aktifkan Fitur Pembelajaran: Centang opsi umpan balik, animasi, atau leaderboard sesuai kebutuhan pedagogis.
5. Generate & Salin JSON:
    * Lihat pratinjau JSON di panel sebelah kanan.
    * Klik Copy JSON untuk menyalin ke clipboard, atau klik .json untuk mengunduh file JSON secara langsung.
6. Eksekusi ke LLM: Paste hasil JSON tersebut ke ChatGPT / Claude / Gemini dengan perintah:
    * **"Buatkan game sesuai dengan spesifikasi JSON berikut:" [Paste JSON]**

---

## 📄 Struktur Output JSON
{
  "metadata": {
    "generator_app": "Interactive Math Game Prompt Generator",
    "created_at": "2026-09-21T17:15:00.000Z",
    "education_level": "SD",
    "grade_level": "Kelas 4",
    "main_topic": "Pecahan, Desimal & Persen",
    "sub_topics": ["Pecahan Senilai", "Penjumlahan Pecahan"],
    "target_platform": "Web Browser (HTML5/JS)"
  },
  "system_instruction": {
    "role": "Senior Educational Game Developer & Pedagogy Specialist",
    "task": "Buatkan KODE LENGKAP game edukasi matematika interaktif berbasis Single-File Web HTML5...",
    "output_format": "BERIKAN OUTPUT DALAM BENTUK SATU FILE HTML5 LENGKAP (<!DOCTYPE html> ... </html>)...",
    "key_requirements": [
      "WAJIB: Hasilkan kode dalam SATU FILE HTML (.html)...",
      "Game harus interaktif, memiliki visualisasi matematika yang dinamis...",
      "Sediakan umpan balik langsung (instant feedback)..."
    ]
  },
  "pedagogical_framework": { ... },
  "game_mechanics": { ... },
  "sample_questions_structure": [ ... ]
}