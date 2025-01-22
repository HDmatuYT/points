const add1Button = document.getElementById("add1");
const add3Button = document.getElementById("add3");
const add4Button = document.getElementById("add4");
const add05Button = document.getElementById("add05");
const subtract3Button = document.getElementById("subtract3");
const resetButton = document.getElementById("reset");
const cashoutButton = document.getElementById("cashout"); // Ainult üks kord deklareeritud
const totalPointsDiv = document.getElementById("totalPoints");

let points = 0;

// Funktsioon, mis uuendab kuvatavaid punkte
function updatePoints() {
    totalPointsDiv.textContent = `Kokku: ${points} punkti`;
}

// Funktsioon, et uuendada punkte API-s
function updatePointsInAPI() {
    fetch("https://points-ntev.onrender.com/points", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ points: points }),
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
    })
    .then(data => {
        console.log("Punktid uuendatud:", data);
    })
    .catch(error => {
        console.error("Viga punktide uuendamisel:", error);
    });
}

// Laadi lehe alguses punktide kogus API-st
window.addEventListener("load", () => {
    fetch("https://points-ntev.onrender.com/points")
        .then(response => response.json())
        .then(data => {
            points = data.points;  // API-st saadud punktide väärtus
            updatePoints();         // Uuenda kuvatavad punktid
        })
        .catch(error => {
            console.error("Viga punktide laadimisel:", error);
        });
});

// Üritused nuppudele
add1Button.addEventListener("click", () => {
    points += 1;
    updatePoints();
    updatePointsInAPI();
});

add3Button.addEventListener("click", () => {
    points += 3;
    updatePoints();
    updatePointsInAPI();
});

add4Button.addEventListener("click", () => {
    points += 4;
    updatePoints();
    updatePointsInAPI();
});

add05Button.addEventListener("click", () => {
    points += 0.5;
    updatePoints();
    updatePointsInAPI();
});

subtract3Button.addEventListener("click", () => {
    if (points >= 3) {
        points -= 3;
        updatePoints();
        updatePointsInAPI();
    } else {
        alert("Sul ei ole piisavalt punkte.");
    }
});

resetButton.addEventListener("click", () => {
    points = 0;
    updatePoints();
    updatePointsInAPI();
});

// Funktsioon cashout logi andmebaasi saatmiseks
function logCashoutToDatabase(points) {
    fetch("https://points-ntev.onrender.com/cashout-log", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            points: points,                 // Kasutaja punktide kogus
            timestamp: new Date().toISOString(), // Aeg, millal cashout toimus
        }),
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
    })
    .then(data => {
        console.log("Cashout log edukalt salvestatud:", data);
        alert("Teie cashout logi on salvestatud andmebaasi.");
    })
    .catch(error => {
        console.error("Viga cashout logi salvestamisel:", error);
        alert("Cashout logi salvestamisel tekkis viga. Palun proovi uuesti.");
    });
}

cashoutButton.addEventListener("click", () => {
    // Logi cashout andmebaasi
    logCashoutToDatabase(points);

    // Lisame vajadusel täiendava tegevuse, nt reseti või muu tegevuse:
    points = 0;
    updatePoints();  // Uuenda punkte
    updatePointsInAPI(); // Saada uued punktid API-sse
});
