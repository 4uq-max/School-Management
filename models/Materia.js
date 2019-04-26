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
        "Geography",
        "Philosophy",
        "Biology",
        "Phisics",
        "Chemistry",
        "Technology",
        "Arts",
        "English",
        "Physical Education"
      ]
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    note: {
      type: Number,
      period: {
        type: String,
        enum: [
          "agust-september",
          "october-november",
          "december-january",
          "february-march",
          "april-may",
          "june-july"
        ]
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Materia", materiaSchema);



