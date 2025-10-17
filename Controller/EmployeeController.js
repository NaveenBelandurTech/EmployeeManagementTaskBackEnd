const Employee = require("../Model/Employee");

const GetEmployess = async (req, res) => {
  try {
    const employee = req.user._id;
    const findEmployer = await Employee.find({ User: employee });
    if (findEmployer) {
      return res.status(200).json(findEmployer);
    }
  } catch (err) {
    console.log(err);
    throw new EmployeeError("error in getting the employee" || err);
  }
};

const CreateEmployee = async (req, res) => {
  try {
    const { employeeName, Gender, role } = req.body;

    if (!employeeName || !Gender || !role) {
      return res.status(400).json("Employee Details cannot be empty");
    }

    const NewEmployee = new Employee({
      employeeName,
      Gender,
      role,
      User: req.user._id,
    });
    await NewEmployee.save();
    return res.status(200).json({
      message: "Employee Created Succesfull",
      NewEmployee,
    });
  } catch (Err) {
    console.log(Err || "Error in creating the employee");
  }
};

const EditEmployee = async (req, res) => {
  try {
    const { employeeName, Gender, role } = req.body;
    const employeeId = req.params.id;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.employeeName = employeeName || employee.employeeName;
    employee.Gender = Gender || employee.Gender;
    employee.role = role || employee.role;

    const updatedEmployee = await employee.save();

    res.status(200).json(updatedEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error editing the employee" });
  }
};

module.exports = {
  GetEmployess,
  CreateEmployee,
  EditEmployee,
};
