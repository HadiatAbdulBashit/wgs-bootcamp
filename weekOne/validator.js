// Import modul validator dan readline
const { isEmail, isMobilePhone } = require('validator');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Gunakan readline untuk menanyakan nama pengguna
readline.question('Siapa nama kamu? ', name => {

    // Fungsi untuk menanyakan nomor telepon pengguna
    function tanyaNomor() {
        readline.question('Berapa nomor telponnya? ', telp => {
            // Validasi nomor telepon menggunakan isMobilePhone
            if (!isMobilePhone(telp, 'id-ID')) {
                console.log('Masukkan nomor telepon yang benar');
                // Jika nomor telepon tidak valid, tanyakan lagi
                tanyaNomor();
            }

            // Fungsi untuk menanyakan alamat email pengguna
            function tanyaEmail(){
                readline.question('Email kamu apa? ', email => {
                    // Validasi alamat email menggunakan isEmail
                    if (isEmail(email)) {
                        console.log(`Nama kamu adalah ${name}!`);
                        console.log(`Nomor telepon kamu ${telp}!`);
                        console.log(`Email kamu ${email}!`);
                        // Tutup readline setelah selesai
                        readline.close();
                    } else {
                        console.log('Masukkan alamat email yang benar');
                        // Jika alamat email tidak valid, tanyakan lagi
                        tanyaEmail();
                    }
                });
            }

            // Tanyakan alamat email setelah mendapatkan nomor telepon yang valid
            tanyaEmail();
        });
    }

    // Mulai interaksi dengan memanggil fungsi tanyaNomor
    tanyaNomor();
});

