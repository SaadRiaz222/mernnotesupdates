const sequelize = require("../bin/dbConnection");

const users = require("./definations/users");
const tasks = require("./definations/tasks");
const products = require("./definations/products");
const sessions = require("./definations/sessions");

const models = { users, tasks, products, sessions };

// Relations
users.hasMany(tasks, { foreignKey: "userID" });
tasks.belongsTo(users, { foreignKey: "userID" });

users.hasOne(sessions, { foreignKey: "userID" });
sessions.belongsTo(users, { foreignKey: "userID" });

const db = {};

db.sequelize = sequelize;
sequelize.models = models;

module.exports = { db, models };
