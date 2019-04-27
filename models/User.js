const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    username: String,
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    hash: {
      type: String,
      unique: true
    },
    role: {
      type: String,
      enum: ["MANAGER", "TEACHER", "PARENT", "STUDENT"],
      default: "STUDENT"
    },
    tutor: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    materia: {
      type: Schema.Types.ObjectId,
      ref: "Materia"
    }
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  hashField: "password"
});

module.exports = mongoose.model("User", userSchema);
