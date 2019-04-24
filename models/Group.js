const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    alumni: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    teacher: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    } 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);