const route = require("express").Router();

const { createTask, getAllTasks } = require("../controllers/taskController");

route.post("/createTask", createTask);
route.get("/getAllTasks", getAllTasks);
// route.delete("/deleteUser", deleteUser);
// route.get("/findUser", findUser);
// route.get("/getAllUsers", getAllUsers);
// route.patch("/updateUser", updateUser);

module.exports = route;
