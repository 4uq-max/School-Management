const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materiaSchema = new Schema(
  {
    materia: {
      type: String,
      enum: [
        "Spanish 1",
        "Spanish 2",
        "Spanish 3",
        "Maths 1",
        "Maths 2",
        "Maths 3",
        "History",
        "Geography",
        "Philosophy",
        "Biology",
        "Phisics",
        "Chemistry",
        "Technology 1",
        "Technology 2",
        "Technology 3",
        "Arts 1",
        "Arts 2",
        "Arts 3",
        "English 1",
        "English 2",
        "English 3"
      ]
    },
    teacher: {
      type: Schema.ObjectId,
      ref: "User"
    },
    notes: [
      {
        periodo: {
          type: String,
          enum: [
            "agust-september",
            "october-november",
            "december-january",
            "february-march",
            "april-may",
            "june-july"
          ]
        },
        note: [
          {
            type: Number
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Materia", materiaSchema);
