const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: String,
    description: String,
    image: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);