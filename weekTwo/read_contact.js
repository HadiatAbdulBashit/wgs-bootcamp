const fs = require('fs');

// Membaca data JSON yang sudah ada (jika ada)
const savedContact = fs.readFileSync('./data/contacts.json', 'utf8', (err, data) => {
    if (err) {
        if (err.code === 'ENOENT') {
            // Jika file tidak ditemukan, inisialisasi array kosong
            data = '[]';
        } else {
            // Jika ada kesalahan lain, tampilkan pesan kesalahan
            console.error('Error read file:', err);
            return;
        }
    }
    // Mengembalikan data dalam berntuk string
    return data;
})

module.exports = savedContact;