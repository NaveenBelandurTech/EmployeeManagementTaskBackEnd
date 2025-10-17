const mongoosee = require("mongoose");

const CreateTaskSchema = new mongoosee.Schema(
  {
    User: {
      type: mongoosee.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please add the Title"],
    },
    taskdetails: {
      type: String,
      required: [true, "Please add the Task Details"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    employee: {
      type: mongoosee.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  { timestamps: true }
);

const TaskDetails = mongoosee.model("Task", CreateTaskSchema);
module.exports = TaskDetails;
