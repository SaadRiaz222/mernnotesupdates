const route = require("express").Router();

const { createSession } = require("../controllers/sessionController");

route.post("/createSession", createSession);
// route.delete("/deleteUser", deleteUser);
// route.get("/findUser", findUser);

module.exports = route;
