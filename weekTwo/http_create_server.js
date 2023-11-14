const http = require('http');

http
    .createServer((req, res) => {
        const url = req.url;
        res.writeHead(200,{
            'Content-Type': 'text/html',
        })
        if (url == '/about') {
            res.write('About');
        } else if (url == '/contact') {
            res.write('Contact');
        } else {
            res.write('Home')
        }
        res.end();
    })
    .listen(3000, () =>{
        console.log('Server is listening on port 3000');
    });