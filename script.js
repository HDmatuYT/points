const add1Button = document.getElementById("add1");
const add5Button = document.getElementById("add5");
const add10Button = document.getElementById("add10");
const resetButton = document.getElementById("reset");
const subtractButton = document.getElementById("subtract");
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
        body: JSON.stringify({ points: points }),
        mode: "no-cors",  // Set this to disable CORS check
    })
    .then(response => {
        // You won't be able to read the response body with `no-cors`
        console.log("Points updated");
    })
    .catch(error => console.error("Error updating points:", error));
}

// Load the current points from the API when the page loads
window.addEventListener("load", () => {
    fetch("https://points-ntev.onrender.com/points")
        .then(response => response.json())
        .then(data => {
            points = data.points;
            updatePoints();
        })
        .catch(error => console.error("Error loading points:", error));
});
