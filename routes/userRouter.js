const route = require("express").Router();

// const userController = require("../controllers/userController");
const {
  createUser,
  updateUser,
  deleteUser,
  findUser,
  getAllUsers,
} = require("../controllers/userController");

route.post("/createUser", createUser);
route.get("/updateUser", updateUser);
route.delete("/deleteUser", deleteUser);
route.get("/findUser", findUser);
route.get("/getAllUsers", getAllUsers);
route.patch("/updateUser", updateUser);

module.exports = route;