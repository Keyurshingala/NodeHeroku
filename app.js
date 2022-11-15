import express from "express";
import path from "path";

var app = express()

app.get("/", async (req, res) => {
    res.send('<h1> Hellow </h1>');
    res.end()
})

app.get("/file", async (req, res) => {
    res.sendFile(path.join(__dirname, '/index.htmll'))
})

app.get("/search", async (req, res) => {
    res.sendFile(path.resolve('data.json'));

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server listening on ${PORT}`));