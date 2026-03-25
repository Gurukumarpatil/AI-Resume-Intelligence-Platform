const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// SCHEMA
const Resume = mongoose.model("Resume", {
  name: String,
  email: String,
  skills: [String]
});

// POST - Save Resume
app.post("/save", async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    await newResume.save();

    console.log("Saved to DB");
    res.send("Saved to DB");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving");
  }
});

// GET - Fetch all resumes
app.get("/resumes", async (req, res) => {
  try {
    const data = await Resume.find();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching data");
  }
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(5000, () => console.log("Server running on port 5000"));