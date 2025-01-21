const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// JSON-faili asukoht
const FILE_PATH = 'points.json';

// Lae punktid failist
app.get('/points', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Faili lugemine ebaõnnestus' });
        }
        const points = JSON.parse(data || '{}');
        res.json(points);
    });
});

// Salvesta punktid faili
app.post('/points', (req, res) => {
    const { totalPoints } = req.body;
    if (typeof totalPoints !== 'number' || totalPoints < 0) {
        return res.status(400).json({ error: 'Punktide väärtus on vigane' });
    }

    fs.writeFile(FILE_PATH, JSON.stringify({ totalPoints }, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Faili salvestamine ebaõnnestus' });
        }
        res.json({ message: 'Punktid salvestatud' });
    });
});

// Serveri kuulamine
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server töötab pordil ${PORT}`);
});
