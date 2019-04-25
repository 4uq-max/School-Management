const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const materiaSchema = new Schema(
  {
    materia: {
      type: String,
      enum: [
        "Spanish",
        "Math",
        "History",
        "Philosophy",
        "Science",
        "Technology",
        "English",
        "Physical Education"
      ],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Materia", materiaSchema);
