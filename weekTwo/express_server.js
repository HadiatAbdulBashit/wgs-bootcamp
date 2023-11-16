const express = require('express')
var expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');

const app = express()
const port = 3000

app.use(express.static('public'));
app.use(morgan('dev'));

const contacts = [
    {
        nama: 'hadiat',
        telp: '08231827612'
    },
    {
        nama: 'abdul',
        telp: '08123782131'
    },
    {
        nama: 'bashit',
        telp: '06132873921'
    }
]

app.set('layout', './master')
app.set('view engine', 'ejs')

app.use(expressLayouts);

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
})
app.get('/about', (req, res) => {
    res.render('about', { nama: 'Hadiat Abdul', title: 'About' })
})
app.get('/contact', (req, res) => {
    res.render('contact', { contacts, title: 'Contact' })
})
app.get('/product/:id', (req, res) => {
    res.send('<h1>product id: ' + req.params.id + '<br>Category: ' + req.query.category + '<h1>')
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('Page not Found : 404')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}/`);
})