let totalPoints = 0;

// API URL (muuda see oma serveri URL-iks)
const API_URL = 'https://punktide-server.onrender.com/points';

// Lae punktid serverist
async function loadPoints() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        totalPoints = data.totalPoints || 0;
        updateDisplay();
    } catch (error) {
        console.error('Punktide laadimine ebaõnnestus:', error);
    }
}

// Saada punktid serverisse
async function savePoints() {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalPoints }),
        });
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
