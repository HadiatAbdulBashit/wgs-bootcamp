// Menggunakan modul express untuk membuat aplikasi web
const express = require('express');

// Modul express-ejs-layouts untuk pengaturan tata letak EJS
var expressLayouts = require('express-ejs-layouts');

// Modul morgan untuk logging HTTP requests
const morgan = require('morgan');

// Modul body-parser untuk memproses body dari request
var bodyParser = require('body-parser');

// Modul express-validator untuk validasi input
const { body, validationResult, check } = require('express-validator');
const { addContact, getAllContact, getContact, updateContact, deleteContact } = require('./repository');

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
app.get('/contact', async (req, res) => {
  const result = await getAllContact();
  res.render('contact', { contacts: result, title: 'Contact' });
});

// Route untuk menampilkan formulir penambahan kontak
app.get('/contact/add', (req, res) => {
  res.render('form', { title: 'Add Contact', name: '', phone: '', email: '' });
});

// Route untuk menangani penambahan kontak dari formulir
app.post(
  '/contact/add',
  [
    check('phone', 'Phone not valid!').isMobilePhone('id-ID'),
    check('email', 'Email not valid!').isEmail(),
  ],
  async (req, res) => {
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
    const contact = {name: req.body.name, phone: req.body.phone, email: req.body.email};
    const result = await addContact(contact)
    res.redirect('/contact');
  }
);

// Route untuk menampilkan formulir pengeditan kontak
app.get('/contact/edit/:id', async (req, res) => {
  const selectedData = await getContact(req.params.id)
  res.render('edit-form', { title: 'Edit Contact', selectedData, name: null, email: null, phone: null });
});

// Route untuk menangani pengeditan kontak dari formulir
app.post(
  '/contact/edit/:id',
  [
    check('phone', 'Phone not valid!').isMobilePhone('id-ID'),
    check('email', 'Email not valid!').isEmail(),
  ],
  async (req, res) => {
    
    const selectedData = {
    id: req.params.id,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  }
    const error = validationResult(req);
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

    
    const result = await updateContact(selectedData);
    console.log(result);
    res.redirect('/contact');
  }
);

// Route untuk menghapus kontak berdasarkan nama
app.get('/contact/delete/:id', async (req, res) => {
  await deleteContact(req.params.id)
  res.redirect('/contact');
});

// Route untuk menampilkan detail kontak berdasarkan nama
app.get('/contact/:id', async (req, res) => {
  const selectedData = await getContact(req.params.id)
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
