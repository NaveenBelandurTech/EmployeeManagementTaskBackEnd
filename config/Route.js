const Express = require("express");
const Route = Express.Router();
const {
  HomeRoute,
  Register,
  Login,
  UserProfile,
} = require("../Controller/UserController");
const {
  GetEmployess,
  CreateEmployee,
  EditEmployee,
} = require("../Controller/EmployeeController");
const {
  CreateList,
  ListTask,
  EditTask,
} = require("../Controller/TaskController");
const TokenVerify = require("../Middleware/Auth");

//This is the User Routes
Route.get("/Home", HomeRoute);
Route.post("/Register", Register);
Route.post("/Login", Login);
Route.get("/profile", TokenVerify, UserProfile);

// Employee Routes
Route.post("/createemployee", TokenVerify, CreateEmployee);
Route.get("/ListEmployee", TokenVerify, GetEmployess);
Route.put("/EditEmployee/:id", TokenVerify, EditEmployee);

// Task Routes
Route.post("/CreateList", TokenVerify, CreateList);
Route.get("/listtask", TokenVerify, ListTask);
Route.put("/EditTask", TokenVerify, EditTask);
module.exports = Route;
