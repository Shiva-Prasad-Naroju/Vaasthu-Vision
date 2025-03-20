const fs = require("fs");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/VaasthuDB")
    .then(() => console.log("✅ Connected to MongoDB - VaasthuDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Define Schema
const vastuSchema = new mongoose.Schema({
    rule: String,  // Rule names like "Rule 1", "Rule 2"
    description: String,
    recommended_directions: [String],
    restricted_directions: [String],
    importance: String
});

// Create Model
const VastuRule = mongoose.model("VastuRule", vastuSchema);

// Read JSON File
const jsonData = fs.readFileSync("vaasthu_rules.json", "utf-8");
const vastuRules = JSON.parse(jsonData);

// Function to Update MongoDB
async function updateVastuRules() {
    try {
        for (const rule of vastuRules) {
            const existingRule = await VastuRule.findOne({ rule: rule.rule });
            if (!existingRule) {
                await VastuRule.create(rule);
                console.log(`✅ Added: ${rule.rule}`);
            } else {
                await VastuRule.updateOne({ rule: rule.rule }, rule);
                console.log(`🔄 Updated: ${rule.rule}`);
            }
        }
        console.log("✅ Vastu rules successfully updated in MongoDB.");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error updating Vastu rules:", error);
    }
}

// Run Function
updateVastuRules();
