// Import modul readline untuk interaksi dengan pengguna
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array pertanyaan dan objek yang akan diisi oleh pengguna
const tanya = [
    {
        pertanyaan: 'Siapa',
        objek: 'nama',
    },
    {
        pertanyaan: 'Berapa',
        objek: 'nomor',
    },
    {
        pertanyaan: 'Apa',
        objek: 'email',
    },
];

// Inisialisasi indeks untuk mengakses pertanyaan dalam array
let index = 0;

// Fungsi untuk bertanya kepada pengguna
function tanyaDonk() {
    // Ambil pertanyaan dan objek dari array
    let { pertanyaan, objek } = tanya[index];

    // Tanyakan pertanyaan kepada pengguna
    readline.question(`${pertanyaan} ${objek} kamu? `, jawaban => {
        // Tampilkan jawaban pengguna
        console.log(`${objek} kamu ${jawaban}!`);

        // Pindah ke pertanyaan berikutnya
        index++;

        // Jika sudah selesai semua pertanyaan, tutup interface readline
        tanya.length <= index ? readline.close() : tanyaDonk();
    });
}

// Mulai interaksi dengan memanggil fungsi tanyaDonk
tanyaDonk();
