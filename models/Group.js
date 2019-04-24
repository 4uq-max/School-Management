const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    alumni: [String] 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);