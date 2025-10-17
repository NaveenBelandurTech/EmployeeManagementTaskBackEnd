const Express = require("express");
const App = Express();
const cors = require("cors");
const SetUpDb = require("./config/Db");
const Route = require("./config/Route");
const env = require("dotenv").config();

App.use(cors());
App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));
App.use("/", Route);

SetUpDb();

App.listen(process.env.PORT, () => {
  console.log(`Listing on the Port ${process.env.PORT}`);
});
