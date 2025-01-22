const add1Button = document.getElementById("add1");
const add3Button = document.getElementById("add3");
const add4Button = document.getElementById("add4");
const add05Button = document.getElementById("add05");
const subtract3Button = document.getElementById("subtract3");
const resetButton = document.getElementById("reset");
const cashoutButton = document.getElementById("cashout");
const totalPointsDiv = document.getElementById("totalPoints");
const rateTextDiv = document.getElementById("rateText");

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
    points -= 3;
    updatePoints();
    updatePointsInAPI();
});

resetButton.addEventListener("click", () => {
    points = 0;
    updatePoints();
    updatePointsInAPI();
});

// Cashout nupp
cashoutButton.addEventListener("click", () => {
    const euros = parseFloat(prompt("Sisesta summa eurodes, mille soovid välja võtta."));
    
    if (!isNaN(euros) && euros > 0 && euros <= points) {
        points -= euros;  // Lahuta vajalik arv punkte (üks punkt = üks euro)
        alert(`Oled välja võtnud ${euros} € (koos vastava punktide lahutamisega).`);
        updatePoints();  // Uuenda kuvatavad punktid
        updatePointsInAPI();  // Uuenda punkte API-s

        // Logi cashout API-sse
        fetch("https://points-ntev.onrender.com/cashout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ euros: euros, points: euros }),  // Üks punkt = üks euro
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(data => {
            console.log("Cashout logitud:", data);
        })
        .catch(error => {
            console.error("Viga cashouti logimisel:", error);
        });
    } else {
        alert("Palun sisesta kehtiv summa, mille soovid välja võtta.");
    }
});
