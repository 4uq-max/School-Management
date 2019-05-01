const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
  {
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
      type: Schema.ObjectId,
      ref: "User"
    },
    group: {
      type: Schema.ObjectId,
      ref: "Group"
    }
  },
  { timestamps: true }
);

userSchema.statics.getByGroupTag = function(tag) {
  return this.aggregate([
    {
      $match: {
        role: "STUDENT"
      }
    },
    {
      $lookup: {
        from: "groups",
        localField: "group",
        foreignField: "_id",
        as: "group"
      }
    },
    { $unwind: "$group" },
    {
      $match: {
        "group.tag": tag
      }
    }
  ]);
};

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  hashField: "password"
});

module.exports = mongoose.model("User", userSchema);
