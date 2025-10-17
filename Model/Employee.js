const mongoose = require("mongoose");

const CreatEmployeeSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeName: {
      type: String,
      required: [true, "Please Add Employee Name"],
    },
    Gender: {
      type: String,
      required: [true, "Please add the Gender"],
      default: "Male",
    },
    role: {
      type: String,
      required: [true, "Please add the Role Of the Employee"],
    },
  },
  { timestamps: true }
);

const Emplopyee = mongoose.model("Employee", CreatEmployeeSchema);
module.exports = Emplopyee;
