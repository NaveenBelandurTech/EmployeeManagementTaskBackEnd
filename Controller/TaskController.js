const Emplopyee = require("../Model/Employee");
const Employee = require("../Model/Employee");
const TaskDetails = require("../Model/Task");

const ListTask = async (req, res) => {
  try {
    const TaskListAll = await TaskDetails.find({ User: req.user._id });
    res.status(200).json(TaskListAll);
  } catch (Err) {
    console.log(Err);
    throw new ListError(Err);
  }
};

const CreateList = async (req, res) => {
  console.log(req.body, "body");
  try {
    const { title, taskdetails, status, employee } = req.body;

    if (!title || !taskdetails || !status) {
      return res.status(400).json({ message: "Fields Cannot Be Empty" });
    }

    const CreateTask = await TaskDetails({
      title,
      taskdetails,
      status,
      employee,
      User: req.user._id,
    });

    const TaskCreated = await CreateTask.save();
    console.log(TaskCreated, "Task Created");
    return res.status(200).json({
      message: "Task Created Succesfully",
      TaskCreated,
    });
  } catch (Err) {
    console.log(Err);
    throw new TaskError("New Task Error");
  }
};


const EditTask = async (req, res) => {
  try {
    const { title, taskdetails, status, employee } = req.body;
    const taskId = req.params.id;

    const task = await TaskDetails.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    
    if (employee) {
      const emp = await Employee.findById(employee);
      if (!emp || emp.User.toString() !== req.user._id.toString()) {
        return res.status(400).json({ message: 'Invalid employee assignment' });
      }
      task.employee = employee;
    }


    task.title = title || task.title;
    task.taskdetails = taskdetails || task.taskdetails;
    if (status !== undefined) task.status = status;

    const updatedTask = await task.save();
    res.status(200).json({ message: 'Task updated successfully', updatedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating task' });
  }
};


const GetAllEmployeeTask = async (req, res) => {
  try {
    const EmployeeList = await Employee.find({ User: req.user._id });
    let result = [];

    for (let i = 0; i < EmployeeList.length; i++) {
      const emp = EmployeeList[i];
      const AllTaskdetails = await TaskDetails.find({ employee: emp._id });

      result.push({
        employeeName: emp.employeeName,
        employeeId: emp._id,
        tasks: AllTaskdetails,
      });
    }

    res.status(200).json(result);
  } catch (Err) {
    console.log(Err);
    res.status(500).json({ message: "Error fetching employee tasks" });
  }
};



module.exports = {
  CreateList,
  ListTask,
  EditTask,
  GetAllEmployeeTask
};
