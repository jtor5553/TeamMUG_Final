const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true
    },
    courseCode: {
      type: String,
      trim: true,
      default: ""
    },
    instructor: {
      type: String,
      trim: true,
      default: ""
    },
    semester: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Course", courseSchema);