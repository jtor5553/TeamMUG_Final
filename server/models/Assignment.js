const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  courseName: String,
  assignmentTitle: String,
  dueDate: String,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Assignment", assignmentSchema);