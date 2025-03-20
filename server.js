const express = require("express");
const mongoose = require("./database"); // Import database connection
const VastuRule = require("./model"); // Import Schema model

const app = express();
app.use(express.json()); // Middleware to handle JSON data

// Simple route to check server
app.get("/", (req, res) => {
    res.send("Welcome to Vaasthu AI Guidance API! 🚀");
});

// API to fetch all Vastu rules
app.get("/vastu-rules", async (req, res) => {
    try {
        const rules = await VastuRule.find();
        res.json(rules);
    } catch (error) {
        res.status(500).json({ error: "Error fetching rules from database" });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
