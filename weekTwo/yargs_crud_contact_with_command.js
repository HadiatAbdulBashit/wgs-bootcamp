// Menggunakan modul yargs untuk memproses argumen baris perintah
const yargs = require('yargs');
// Menggunakan modul fs untuk operasi file
const fs = require('fs');

// Memuat fungsi saveContact dan readContact dari modul eksternal
const saveContact = require('./save_contact');
const savedContact = require('./read_contact');

// Menambahkan perintah 'add' untuk menambahkan kontak baru
yargs.command({
  command: 'add',
  describe: 'Add new contact',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string'
    },
    phone: {
      describe: 'Phone',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'Email',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    // Memanggil fungsi saveContact untuk menyimpan kontak baru
    saveContact(argv.name, argv.phone, argv.email);
  }
});

// Menambahkan perintah 'list' untuk menampilkan daftar kontak yang sudah disimpan
yargs.command({
  command: 'list',
  describe: 'List of saved contacts',
  handler() {
    const data = JSON.parse(savedContact);
    data.forEach(element => {
      console.log(`${element.name} - ${element.phone}`);
    });
  }
});

// Menambahkan perintah 'detail' untuk menampilkan detail kontak berdasarkan nama
yargs.command({
  command: 'detail',
  describe: 'Detail of selected contact',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    const data = JSON.parse(savedContact);
    // Mencari kontak dengan nama yang sesuai
    const selectedData = data.find(contact => contact.name == argv.name);
    console.log('Name  ', selectedData.name);
    console.log('Phone ', selectedData.phone);
    console.log('Email ', selectedData.email);
  }
});

// Menambahkan perintah 'update' untuk memperbarui kontak yang sudah ada
yargs.command({
  command: 'update',
  describe: 'Update selected contact',
  builder: {
    name: {
      describe: 'Name',
      type: 'string'
    },
    phone: {
      describe: 'Phone',
      type: 'string'
    },
    email: {
      describe: 'Email',
      type: 'string'
    },
    selectName: {
      describe: 'Selected name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    const data = JSON.parse(savedContact);
    // Mencari kontak dengan nama yang sesuai
    const selectedData = data.find(contact => contact.name === argv.selectName);

    if (selectedData == undefined) {
      console.log('Data tidak ditemukan');
    } else {
      // Memperbarui informasi kontak
      selectedData.name = argv.name ?? selectedData.name;
      selectedData.phone = argv.phone ?? selectedData.phone;
      selectedData.email = argv.email ?? selectedData.email;

      // Menyimpan perubahan ke file
      fs.writeFile('./data/contacts.json', JSON.stringify(data), 'utf8', (err) => {
        if (err) {
          console.error('Error write to file:', err);
        } else {
          console.log('Contact updated!');
        }
      });
    }
  }
});

// Menambahkan perintah 'delete' untuk menghapus kontak berdasarkan nama
yargs.command({
  command: 'delete',
  describe: 'Delete selected contact',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    const data = JSON.parse(savedContact);
    // Mencari kontak dengan nama yang sesuai
    const selectedData = data.find(contact => contact.name === argv.name);
    const selectedIndex = data.findIndex(contact => contact.name === argv.name);

    if (selectedData == undefined) {
      console.log('Data tidak ditemukan');
    } else {
      // Menghapus kontak dari array
      data.splice(selectedIndex, 1);

      // Menyimpan perubahan ke file
      fs.writeFile('./data/contacts.json', JSON.stringify(data), 'utf8', (err) => {
        if (err) {
          console.error('Error write to file:', err);
        } else {
          console.log('Contact deleted!');
        }
      });
    }
  }
});

// Menggunakan yargs untuk memproses perintah yang diberikan
yargs.parse();
