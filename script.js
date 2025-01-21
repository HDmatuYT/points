const add1Button = document.getElementById("add1");
const add5Button = document.getElementById("add3");
const add10Button = document.getElementById("add4");
const add05button = document.getElementById("add0.5")
const resetButton = document.getElementById("reset");
const subtractButton = document.getElementById("subtract3");
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
        body: JSON.stringify({ points: points }),  // Veendu, et see sobib API ootustega
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

add5Button.addEventListener("click", () => {
    points += 5;
    updatePoints();
    updatePointsInAPI();
});

add10Button.addEventListener("click", () => {
    points += 10;
    updatePoints();
    updatePointsInAPI();
});

resetButton.addEventListener("click", () => {
    points = 0;
    updatePoints();
    updatePointsInAPI();
});

subtractButton.addEventListener("click", () => {
    points -= 1;
    updatePoints();
    updatePointsInAPI();
});