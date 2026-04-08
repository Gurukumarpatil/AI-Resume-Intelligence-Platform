const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// Schema
const ResumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String],
  education: String,
  experience: String,
});

const Resume = mongoose.model("Resume", ResumeSchema);

// CREATE
app.post("/save", async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    await newResume.save();
    res.send("Saved");
  } catch (err) {
    res.status(500).send("Error saving");
  }
});

// READ
app.get("/resumes", async (req, res) => {
  const data = await Resume.find();
  res.json(data);
});

// UPDATE
app.put("/update/:id", async (req, res) => {
  try {
    const updated = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).send("Error updating");
  }
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    res.status(500).send("Error deleting");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));