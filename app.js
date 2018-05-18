const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res, next)=>res.sendFile(path.join(__dirname, './index.html')));

app.use((err, req, res, next)=>res.status(500).send(err));

module.exports = app;
