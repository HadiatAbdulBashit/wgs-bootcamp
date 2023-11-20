const fs = require('fs');

const savedContact = require('./read_contact');

function saveContact(name, phone, email) {
    // Make directory if directory not found
    const dir = './data';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // Make file contacts with content [] if file not found
    const fileDir = './data/contacts.json';
    if (!fs.existsSync(fileDir)) {
        fs.writeFileSync(fileDir, '[]', 'utf-8')
    }

    // Parsing data JSON
    const contacts = JSON.parse(savedContact);

    // Menambahkan kontak baru ke daftar kontak
    contacts.push({ name, phone, email });

    // Menyimpan kembali daftar kontak ke file JSON
    fs.writeFile(fileDir, JSON.stringify(contacts), 'utf8', (err) => {
        if (err) {
            console.error('Error write to file:', err);
        } else {
            console.log('Contact saved!');
        }
    });
}

module.exports = saveContact;
