const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const server = express();
const port = process.env.PORT || 3001;

mongoose.promise = global.Promise;
const databaseOptions = { useNewUrlParser: true };
mongoose.set('useCreateIndex', true);

console.log(process.env.MLAB_URI)

mongoose.connect(process.env.MLAB_URI, databaseOptions);
mongoose.connection
    .once('open', () => console.log('The database is connected'))
    .on('error', (err) => console.warn(err));

server.use(express.json());

server.get('/', (req, res) => {
    res.send('server is live!');
});

server.listen(port, () => console.log(`The server is listening on port ${port}`));