const fs = require('fs');

fs.writeFileSync('text.txt', 'Hello world!')

fs.readFile('text.txt', 'utf-8', (err, data) => {
    if (err) {err};
    console.log(data);
});