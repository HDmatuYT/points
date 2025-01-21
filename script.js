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
    // Arvutame, kui palju € saab maksimaalselt välja võtta
    const maxEuros = Math.floor(points / 3);  // 1 € = 3 punkti, nii et jagame punktid 3-ga
    const maxPoints = maxEuros * 3;  // Arvutame vastava punktide arvu, mis võib välja võtta

    // Kuvatakse maksimaalne võimalik summa eurodes
    const euros = parseFloat(prompt(`Sisesta summa eurodes, mille soovid välja võtta. Sa saad maksimaalselt välja võtta ${maxEuros} € (${maxPoints} punkti).`));
    
    if (!isNaN(euros) && euros > 0 && euros <= maxEuros) {
        const requiredPoints = euros * 3;  // 3 punkti = 1 €

        if (points >= requiredPoints) {
            points -= requiredPoints;  // Lahuta vajalik arv punkte
            alert(`Oled välja võtnud ${euros} € (koos vastava punktide lahutamisega).`);
            updatePoints();  // Uuenda kuvatavad punktid
            updatePointsInAPI();  // Uuenda punkte API-s
        } else {
            alert("Sul ei ole piisavalt punkte selle summa välja võtmiseks.");
        }
    } else if (euros > maxEuros) {
        alert(`Sa ei saa välja võtta rohkem kui ${maxEuros} €.`);
    } else {
        alert("Palun sisesta kehtiv summa.");
    }
});
