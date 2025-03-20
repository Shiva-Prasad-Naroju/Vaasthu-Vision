const mongoose = require("mongoose");

// Define Vastu Rule Schema
const vastuSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true }
});

// Create Model
const VastuRule = mongoose.model("VaasthuRules", vastuSchema);

module.exports = VastuRule;
