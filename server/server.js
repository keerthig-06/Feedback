const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to local MongoDB
mongoose
.connect("mongodb://127.0.0.1:27017/feedbackDB")
.then(() => console.log("MongoDB connected successfully"))
.catch((error) => console.log("MongoDB connection error:", error));

const feedbackSchema = new mongoose.Schema({
q1: String,
q2: String,
q3: String,
q4: String,
q5: String,
submittedAt: {
type: Date,
default: Date.now,
},
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Submit feedback
app.post("/api/feedback", async (req, res) => {
try {
const feedback = new Feedback(req.body);
await feedback.save();
res.status(201).json({ message: "Feedback submitted successfully!" });
} catch (error) {
res.status(500).json({ error: "Failed to save feedback" });
}
});

// Get all feedback
app.get("/api/getfeedback", async (req, res) => {
try {
const feedbacks = await Feedback.find();
res.json(feedbacks);
} catch (error) {
res.status(500).json({ error: "Failed to retrieve feedback" });
}
});

app.listen(5000, () => {
console.log("Server running at http://localhost:5000");
});