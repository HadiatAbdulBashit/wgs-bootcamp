// Memuat modul yargs untuk memproses argumen baris perintah
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Memuat modul eksternal saveContact untuk menyimpan informasi kontak
const saveContact = require('./save_contact');

// Mengolah argumen baris perintah menggunakan yargs
const argv = yargs(hideBin(process.argv))
  .option('name', {
    alias: 'n',
    type: 'string',
    description: 'Input your name',
    demandOption: true
  })
  .option('phone', {
    alias: 'p',
    type: 'string',
    description: 'Input your phone number',
    demandOption: true
  })
  .option('email', {
    alias: 'e',
    type: 'string',
    description: 'Input your email'
  })
  .help()
  .argv;

// Menampilkan informasi kontak dari argumen baris perintah
console.log(`Name         : ${argv.name}`);
console.log(`Phone Number : ${argv.phone}`);
console.log(`Email        : ${argv.email}`);

// Memanggil fungsi saveContact untuk menyimpan informasi kontak
saveContact(argv.name, argv.phone, argv.email);
