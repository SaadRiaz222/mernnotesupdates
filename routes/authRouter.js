const route = require('express').Router();


const {
    login,
    logout,
    restPassword,
} = require("../controllers/authController")


route.post("/login", login);
route.delete("/logout", logout);
route.patch("/restPassword", restPassword);


module.exports = route;