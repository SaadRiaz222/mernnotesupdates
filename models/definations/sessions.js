const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class sessions extends Model {}

sessions.init(
  {
    sessionID: {
      primaryKey: true,
      type: DataTypes.STRING(255),
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userID: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255),
      references: {
        model: "users",
        key: "userID",
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "sessions",
    sequelize,
  }
);

module.exports = sessions;
