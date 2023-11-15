const express = require('express')
const path = require('path');
var expressLayouts = require('express-ejs-layouts');

const app = express()
const port = 3000

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

app.set('layout', './fullpage')
app.set('view engine', 'ejs')

app.use(expressLayouts);

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, './views/index.html'));
    res.render('index', {title: 'Home'})
})
app.get('/about', (req, res) => {
    res.render('about', {nama: 'Hadiat Abdul', title: 'About'})
})
app.get('/contact', (req, res) => {
    // res.sendFile('./views/contact.html', {root: __dirname})
    res.render('contact', {contacts,  title: 'Contact'})
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