const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/VaasthuDB", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log("✅ Connected to MongoDB - VaasthuDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Get the connection instance
const db = mongoose.connection;

// Handle connection errors
db.on("error", console.error.bind(console, "❌ Connection error:"));

module.exports = db;

