const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // Mendapatkan URL permintaan
    const url = req.url;

    // Menentukan path file HTML berdasarkan URL
    let filePath = '';

    if (url === '/') {
        filePath = './views/index.html'; // Home page
    } else if (url === '/about') {
        filePath = './views/about.html'; // About page
    } else if (url === '/contact') {
        filePath = './views/contact.html'; // Contact page
    } else {
        // Jika URL tidak dikenali, kembalikan 404 Not Found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
    }

    // Membaca file HTML
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }

        // Mengembalikan respon HTTP dengan file HTML
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    });
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
