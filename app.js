import express from "express";
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express()

app.get("/",   (req, res) => {
    res.send('<h1> Hellow </h1>');
    res.end()
})

app.get("/file",   (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get("/search",   (req, res) => {
    res.sendFile(path.resolve('data.json'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server listening on ${PORT}`));