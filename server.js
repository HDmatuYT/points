const express = require('express');
const fs = require('fs');
const cors = require('cors');  // Lisa CORS tugi
const app = express();

// Kasuta CORS-i kõigi päringute jaoks
app.use(cors());

// Muud kood jääb samaks
app.use(express.json());

// Faili asukoht
const FILE_PATH = 'points.txt';

// Lae punktid failist
app.get('/points', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Faili lugemine ebaõnnestus');
        }
        const points = data || '0';  // Kui fail on tühi, siis alusta 0-ga
        res.send(points);  // Saadame lihtsa väärtuse
    });
});

// Salvesta punktid faili
app.post('/points', (req, res) => {
    const { totalPoints } = req.body;
    if (typeof totalPoints !== 'number' || totalPoints < 0) {
        return res.status(400).send('Punktide väärtus on vigane');
    }

    fs.writeFile(FILE_PATH, totalPoints.toString(), (err) => {
        if (err) {
            return res.status(500).send('Faili salvestamine ebaõnnestus');
        }
        res.send('Punktid salvestatud');
    });
});

// Serveri kuulamine
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server töötab pordil ${PORT}`);
});
