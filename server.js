//work with http server in node js

const { Socket } = require('dgram');
const http  = require('http');

const server = http.createServer((req, res) => {
    // register routes
    if(req.url === '/'){
        res.write(" Hellow World!");
        res.end();
    }
    
    if(req.url === "/api/courses"){
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

// server.on('connection', (Socket) => {
//     console.log("Connected");
// })

server.listen('3000');

console.log('Listening on port 3000...');