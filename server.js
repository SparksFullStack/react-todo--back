const express = require('express');
const mongoose = require('mongoose');

const server = express();
const port = process.env.PORT || 3001;

mongoose.promise = global.Promise;
const databaseOptions = { useNewUrlParser: true };
mongoose.set('useCreateIndex', true);

server.use(express.json());

server.get('/', (req, res) => {
    res.send('server is live!');
});

server.listen(port, () => console.log(`The server is listening on port ${port}`));