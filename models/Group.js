const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    tag: String,
    graph: String,
    materia: [
      {
        type: Schema.ObjectId,
        ref: "Materia"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
