const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Add UserName"],
    },
    password: {
      type: String,
      required: [true, "Please Add Password"],
    },
    email: {
      type: String,
      required: [true, "Please Add Email"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
