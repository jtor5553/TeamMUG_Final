const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const assignmentRoutes = require("./routes/assignments");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/assignments", assignmentRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB error:", err));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});