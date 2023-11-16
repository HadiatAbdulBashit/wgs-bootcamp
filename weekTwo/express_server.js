const express = require('express')
var expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const savedContact = require('./read_contact');
const contacts = JSON.parse(savedContact);

const app = express()
const port = 3000

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
    res.render('form', { contacts, title: 'Add Contact' })
})

app.get('/product/:id', (req, res) => {
    res.send('<h1>product id: ' + req.params.id + '<br>Category: ' + req.query.category + '<h1>')
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('Page not Found : 404')
})

app.listen(port, () => {
    console.log(`Contact app listening on port http://localhost:${port}/`);
})