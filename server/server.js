require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ DB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// Schema
const ScoreSchema = new mongoose.Schema({
  score: Number,
  createdAt: { type: Date, default: Date.now }
});

const Score = mongoose.model("Score", ScoreSchema);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.post("/save-score", async (req, res) => {
  try {
    const newScore = new Score({ score: req.body.score });
    await newScore.save();
    res.json({ message: "Score saved ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/scores", async (req, res) => {
  try {
    const scores = await Score.find().sort({ createdAt: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));