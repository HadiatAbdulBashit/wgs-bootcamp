const http = require('http');

http
    .createServer((req, res) => {
        const url = req.url;
        res.writeHead(200,{
            'Content-Type': 'text/html',
        })
        res.write('Hello Word');
        res.end();
    })
    .listen(3000, () =>{
        console.log('Server is listening on port 3000');
    });