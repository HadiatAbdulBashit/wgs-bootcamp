// Menggunakan modul express untuk membuat aplikasi web
const express = require('express');
// Modul express-ejs-layouts untuk pengaturan tata letak EJS
var expressLayouts = require('express-ejs-layouts');
// Modul morgan untuk logging HTTP requests
const morgan = require('morgan');
// Modul body-parser untuk memproses body dari request
var bodyParser = require('body-parser');
// Modul fs untuk operasi file
const fs = require('fs');
// Modul untuk membaca dan menyimpan kontak dari dan ke file
const savedContact = require('./read_contact');
const saveContact = require('./save_contact');
// Parsing data kontak dari JSON
const contacts = JSON.parse(savedContact);
// Modul express-validator untuk validasi input
const { body, validationResult, check } = require('express-validator');

// Membuat aplikasi express
const app = express();
const port = 3000;

// Menggunakan body-parser untuk membaca JSON dan formulir URL-encoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Menggunakan direktori 'public' untuk menyajikan file statis
app.use(express.static('public'));
// Menggunakan morgan untuk logging
app.use(morgan('dev'));
// Menggunakan express-ejs-layouts untuk pengaturan layout EJS
app.use(expressLayouts);

// Fungsi untuk memeriksa duplikasi nama kontak
const duplicateCheck = (name) => {
  return contacts.find((contact) => contact.name === name);
};

// Pengaturan view engine dan layout
app.set('layout', './master');
app.set('view engine', 'ejs');

// Middleware untuk logging waktu pada setiap request
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Route untuk halaman utama
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Route untuk halaman About
app.get('/about', (req, res) => {
  res.render('about', { nama: 'Hadiat Abdul B', title: 'About' });
});

// Route untuk halaman Kontak
app.get('/contact', (req, res) => {
  res.render('contact', { contacts, title: 'Contact' });
});

// Route untuk menampilkan formulir penambahan kontak
app.get('/contact/add', (req, res) => {
  res.render('form', { title: 'Add Contact', name: '', phone: '', email: '' });
});

// Route untuk menangani penambahan kontak dari formulir
app.post(
  '/contact/add',
  [
    body('name').custom((name) => {
      const duplicate = duplicateCheck(name);
      if (duplicate) {
        throw new Error('Name already exists');
      }
      return true;
    }),
    check('phone', 'Phone not valid!').isMobilePhone('id-ID'),
    check('email', 'Email not valid!').isEmail(),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.render('form', {
        title: 'Add Contact',
        errors: error.array(),
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
      });
    }

    // Memanggil fungsi saveContact untuk menyimpan kontak baru
    saveContact(req.body.name, req.body.phone, req.body.email);
    res.redirect('/contact');
  }
);

// Route untuk menampilkan formulir pengeditan kontak
app.get('/contact/edit/:name', (req, res) => {
  const selectedData = contacts.find((contact) => contact.name == req.params.name);
  res.render('edit-form', { title: 'Edit Contact', selectedData, name: null, email: null, phone: null });
});

// Route untuk menangani pengeditan kontak dari formulir
app.post(
  '/contact/edit/:name',
  [
    body('name').custom((name, { req }) => {
      const duplicate = duplicateCheck(name);
      if (duplicate && name != req.params.name) {
        throw new Error('Name already exists');
      }
      return true;
    }),
    check('phone', 'Phone not valid!').isMobilePhone('id-ID'),
    check('email', 'Email not valid!').isEmail(),
  ],
  (req, res) => {
    const error = validationResult(req);
    const selectedData = contacts.find((contact) => contact.name == req.params.name);
    if (!error.isEmpty()) {
      return res.render('edit-form', {
        title: 'Edit Contact',
        errors: error.array(),
        selectedData,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
      });
    }

    if (selectedData == undefined) {
      console.log('Data not found');
    } else {
      // Memperbarui informasi kontak
      selectedData.name = req.body.name ?? selectedData.name;
      selectedData.phone = req.body.phone ?? selectedData.phone;
      selectedData.email = req.body.email ?? selectedData.email;

      // Menyimpan perubahan ke file
      fs.writeFile('./data/contacts.json', JSON.stringify(contacts), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('Contact updated!');
        }
      });
    }
    res.redirect('/contact');
  }
);

// Route untuk menghapus kontak berdasarkan nama
app.get('/contact/delete/:name', (req, res) => {
  const selectedData = contacts.find((contact) => contact.name === req.params.name);
  const selectedIndex = contacts.findIndex((contact) => contact.name === req.params.name);

  if (selectedData == undefined) {
    console.log('Data not found');
  } else {
    // Menghapus kontak dari array
    contacts.splice(selectedIndex, 1);

    // Menyimpan perubahan ke file
    fs.writeFile('./data/contacts.json', JSON.stringify(contacts), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Contact deleted!');
      }
    });
  }
  res.redirect('/contact');
});

// Route untuk menampilkan detail kontak berdasarkan nama
app.get('/contact/:name', (req, res) => {
  const selectedData = contacts.find((contact) => contact.name == req.params.name);
  res.render('detail', { title: 'Detail', selectedData });
});

// Middleware untuk menangani halaman 404
app.use('/', (req, res) => {
  res.status(404);
  res.send('Page not Found : 404');
});

// Mendengarkan port yang telah ditentukan
app.listen(port, () => {
  console.log(`Contact app listening on port http://localhost:${port}/`);
});
