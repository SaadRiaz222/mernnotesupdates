const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class users extends Model {};

users.init(
  {
    userID: {
      primaryKey: true,
      type: DataTypes.STRING(255),
    },
    userName: {
      type: DataTypes.STRING(34),
      unique: true,
      allowNull: false,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(1000),
    },
    firstName: {
      // allowNull: false,
      type: DataTypes.STRING(1000),
    },
    lastName: {
      // allowNull: false,
      type: DataTypes.STRING(40),
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "users",
    sequelize,
  }
);

module.exports = users;