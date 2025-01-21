const add1Button = document.getElementById("add1");
const add5Button = document.getElementById("add3");
const add10Button = document.getElementById("add4");
const resetButton = document.getElementById("reset");
const subtractButton = document.getElementById("subtract3");
const totalPointsDiv = document.getElementById("totalPoints");

// Initialize points value
let points = 0;

// Function to update the displayed points
function updatePoints() {
    totalPointsDiv.textContent = `Kokku: ${points} punkti`;
}

// Event listeners for button clicks
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

// Function to update points in the API
function updatePointsInAPI() {
    fetch("https://points-ntev.onrender.com/points", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ points: points }),  // Ensure the key matches what the API expects
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
    })
    .then(data => {
        console.log("Points updated:", data);
    })
    .catch(error => {
        console.error("Error updating points:", error);
    });
}

// Load the current points from the API when the page loads
window.addEventListener("load", () => {
    fetch("https://points-ntev.onrender.com/points")
        .then(response => response.json())
        .then(data => {
            points = data.points;
            updatePoints();
        })
        .catch(error => {
            console.error("Error loading points:", error);
        });
});
