const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Use CORS to allow requests from your frontend
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Points storage (in-memory for simplicity)
let points = 0;

// GET endpoint to fetch points
app.get("/points", (req, res) => {
    res.json({ points });
});

// POST endpoint to update points
app.post("/points", (req, res) => {
    const { points: newPoints } = req.body;
    if (typeof newPoints === "number") {
        points = newPoints;
        res.json({ points });
    } else {
        res.status(400).json({ error: "Invalid points value" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
