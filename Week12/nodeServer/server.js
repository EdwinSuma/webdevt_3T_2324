const { createServer } = require('node:http');


const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        'Manila': {
            '1000': 'cloudy',
            '1400': 'light thunderstorm'
        },
    'Cebu':{
        '0900': 'sunny',
        '1000': 'thunderstorm'
    }
 }));
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});