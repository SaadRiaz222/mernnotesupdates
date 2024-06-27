// UserHasTask
// TaskHasType

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class products extends Model {}

products.init(
  {
    productID: {
      primaryKey: true,
      type: DataTypes.STRING(255),
    },
    productName: {
        type: DataTypes.STRING(255),
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "products",
    sequelize,
  }
);

module.exports = products;