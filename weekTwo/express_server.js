const express = require('express')
const path = require('path');

const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.sendFile('./views/contact.html', {root: __dirname})
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