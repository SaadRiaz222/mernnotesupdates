// UserHasTask
// TaskHasType

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class tasks extends Model {}

tasks.init(
  {
    taskID: {
      primaryKey: true,
      type: DataTypes.STRING(255),
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
    },
    userID: {
      allowNull: false,
      type: DataTypes.STRING(255),
      references:{
        model: "users",
        key: "userID"
      }
    }
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "tasks",
    sequelize,
  }
);

module.exports = tasks;