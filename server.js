const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // Et JSON päringud töötaks

let points = 0; // Testimiseks lihtne muutuja

// Lõpp-punkt punktide saamiseks
app.get("/points", (req, res) => {
    res.json({ points: points });
});

// Lõpp-punkt punktide uuendamiseks
app.post("/points", (req, res) => {
    points = req.body.points;
    res.json({ message: "Punktid uuendatud", points: points });
});

// Lõpp-punkt cashout logimiseks
app.post("/cashout-log", (req, res) => {
    const { points, timestamp } = req.body;
    console.log(`Cashout log: ${points} punkti, timestamp: ${timestamp}`);
    res.json({ message: "Cashout log salvestatud" });
});

// Käivita server
app.listen(port, () => {
    console.log(`Server töötab aadressil http://localhost:${port}`);
});
