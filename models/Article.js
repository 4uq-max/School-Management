const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    titlee: String,
    description: String,
    picPath: String,
    picName: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
