let totalPoints = 0;

// API URL
const API_URL = 'https://points-ntev.onrender.com/points';

// Lae punktid serverist või localStorage-st
async function loadPoints() {
    // Proovi laadida punktid localStorage-st
    const storedPoints = localStorage.getItem('totalPoints');
    if (storedPoints !== null) {
        totalPoints = parseInt(storedPoints, 10);  // Konverteerime stringi numbriks
        updateDisplay();
    }

    // Lae punktid serverist
    try {
        const response = await fetch(API_URL);
        const data = await response.text();  // Eeldame, et vastus on lihtsalt tekst
        totalPoints = parseInt(data, 10) || 0; // Kui server tagastab midagi, siis uuendame
        updateDisplay();
    } catch (error) {
        console.error('Punktide laadimine ebaõnnestus:', error);
    }
}

// Saada punktid serverisse ja salvestada localStorage-sse
async function savePoints() {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalPoints }),
        });

        // Salvestame punktid ka localStorage-sse
        localStorage.setItem('totalPoints', totalPoints);
    } catch (error) {
        console.error('Punktide salvestamine ebaõnnestus:', error);
    }
}

document.getElementById('add1').addEventListener('click', () => changePoints(1));
document.getElementById('add5').addEventListener('click', () => changePoints(5));
document.getElementById('add10').addEventListener('click', () => changePoints(10));
document.getElementById('reset').addEventListener('click', resetPoints);
document.getElementById('subtract').addEventListener('click', () => changePoints(-1));

function changePoints(points) {
    totalPoints += points;
    if (totalPoints < 0) totalPoints = 0;
    updateDisplay();
    savePoints();
}

function resetPoints() {
    totalPoints = 0;
    updateDisplay();
    savePoints();
}

function updateDisplay() {
    document.getElementById('totalPoints').textContent = `Kokku: ${totalPoints} punkti`;
}

// Lae punktid alguses
loadPoints();
