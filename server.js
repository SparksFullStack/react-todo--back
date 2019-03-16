const express = require('express');


const server = express();
const port = process.env.PORT || 3001;

server.get('/', (req, res) => {
    res.send('hellow from down below!');
});

server.get('/test', (req, res) => console.log('idk my bff jill'))
server.listen(port, () => console.log(`The server is listening on port ${port}`));