const fs = require('fs');
const { isEmail, isMobilePhone } = require('validator');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Pertanyaan yang akan diajukan kepada pengguna
const pertanyaan = [
    {
        tanya: 'Siapa',
        objek: 'nama',
    },
    {
        tanya: 'Berapa',
        objek: 'nomor',
    },
    {
        tanya: 'Apa',
        objek: 'email',
    },
];

// Fungsi untuk menyimpan kontak ke dalam file JSON
function saveContact(name, nomor, email) {
    // Membaca data JSON yang sudah ada (jika ada)
    fs.readFile('contacts.json', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Jika file tidak ditemukan, inisialisasi array kosong
                data = '[]';
            } else {
                // Jika ada kesalahan lain, tampilkan pesan kesalahan
                console.error('Gagal membaca file:', err);
                return;
            }
        }

        // Parsing data JSON
        const contacts = JSON.parse(data);

        // Menambahkan kontak baru ke daftar kontak
        contacts.push({ name, nomor, email });

        // Menyimpan kembali daftar kontak ke file JSON
        fs.writeFile('contacts.json', JSON.stringify(contacts), 'utf8', (err) => {
            if (err) {
                console.error('Gagal menulis kedalam file:', err);
            } else {
                console.log('Kontak berhasil disimpan!');
            }
        });
    });
}

index = 0; // Menginisialisasi index untuk memulai pertanyaan dari array index ke 0
dataBaru = [] // Menginisialisasi untuk mengampung dataBaru

// Fungsi untuk mengajukan pertanyaan kepada pengguna
const tanyaDonk = () => {

    // Mengajukan pertanyaan sesuai dengan index array pertanyaan
    if (index < pertanyaan.length) { // Pengecekan agar tidak melebihi array pertanyaan
        let { tanya, objek } = pertanyaan[index]; // Destruction objek dari array pertanyaan
        readline.question(`${tanya} ${objek} kamu? `, jawaban => { // Mengajukan pertanyaan menggunakan readline.question
            if (objek == "nomor" && !isMobilePhone(jawaban, 'id-ID')) { // Memeriksa jika objeknya nomor dan tidak valid sesuai format nomor hp indonesia
                console.log(`${jawaban} bukan nomor hp Indonesia yang valid`);
                index--; // Mengurangi nilai index agar mengajukan pertanyaan yang sama
            }

            if (objek == "email" && !isEmail(jawaban)) {
                console.log(`${jawaban} bukan email yang valid`);
                index--; // Mengurangi nilai index agar mengajukan pertanyaan yang sama
            }

            dataBaru[objek] = jawaban; // Menyimpan jawaban delalam array objek 
            index++; // Menambahkan index agar megajukan pertnyaan selanjutnya jika benar
            if (pertanyaan.length <= index) { // Melakukan pengecekan agar tidak pembacaan index tidak lebih dari maxsimum jumlah array
                readline.close(); // Memberhentikan pertanyaan
                saveContact(dataBaru.nama, dataBaru.nomor, dataBaru.email); // Melakukan pemanggilan fungsi saveContact
                console.log(`\nNama kamu adalah ${dataBaru.nama}`);
                console.log(`Nomor telepon kamu ${dataBaru.nomor}`);
                console.log(`Email kamu ${dataBaru.email}\n`);
            } else {
                tanyaDonk(); // Melakukan pemanggilan 
            }
        });
    };
}

// Memulai proses pengajuan pertanyaan
tanyaDonk();