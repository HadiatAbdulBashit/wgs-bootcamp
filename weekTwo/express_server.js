const express = require('express')
var expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
var bodyParser = require('body-parser')
const savedContact = require('./read_contact');
const saveContact = require('./save_contact');
const contacts = JSON.parse(savedContact);

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(expressLayouts);

app.set('layout', './master')
app.set('view engine', 'ejs')

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
})

app.get('/about', (req, res) => {
    res.render('about', { nama: 'Hadiat Abdul B', title: 'About' })
})

app.get('/contact', (req, res) => {
    res.render('contact', { contacts, title: 'Contact' })
})

app.get('/contact/add', (req, res) => {
    res.render('form', { title: 'Add Contact' })
})

app.post('/contact/add', (req, res) => {
    saveContact(req.body.name, req.body.phone, req.body.email)
    res.redirect('/contact')
})

app.get('/contact/:name', (req, res) => {
    const selectedData = contacts.find(contact => contact.name == req.params.name);
    res.render('detail', { title: 'Detail', selectedData })
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('Page not Found : 404')
})

app.listen(port, () => {
    console.log(`Contact app listening on port http://localhost:${port}/`);
})