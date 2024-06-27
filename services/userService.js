const userModel = require("../models/userModel");
const { hash } = require("bcryptjs");
const { v4: uuid } = require("uuid");

module.exports = {
  createUser: async (body) => {
    try {
      body.password = await hash(body.password, 10);
      body.userID = uuid();
      const user = await userModel.createUser(body);

      if (user.error) {
        return {
          error: user.error,
        };
      }

      delete user.response.dataValues.password;
      return {
        response: user.response,
      };
    } catch (error) {
      console.log("Error in Service", error);
      return {
        error: error,
      };
    }
  },
  findUser: async (userId) => {
    try {
      const user = await userModel.findUser(userId);
      console.log("User found", user);

      if (user.error) {
        return {
          error: user.error,
        };
      }

      delete user.response.dataValues.password;
      return {
        response: user.response,
      };
    } catch (error) {
      return { error: error };
    }
  },
  getAllUsers: async () => {
    try {
      const user = await userModel.getAllUsers();

      if (user.error) {
        return {
          error: user.error,
        };
      }

      return {
        response: user.response,
      };
    } catch (error) {
      return { error: error };
    }
  },

  deleteUser: async ({ id }) => {
    try {
      const deleteUser = await userModel.deleteUser(id);

      if (deleteUser.error || !deleteUser.response) {
        return {
          error: {
            message: "Error in deleting user",
            error: deleteUser?.error || deleteUser.response,
          },
        };
      }

      return {
        response: {
          message: "User is deleted!",
          response: deleteUser.response,
        },
      };
    } catch (error) {
      return { error: error };
    }
  },

  updteUser: async (body) => {
    try {
      const updateUser = await userModel.updateUser(body);
      console.log(updateUser.response[0]);
      if (updateUser.error || !updateUser.response[0]) {
        return {
          error: {
            message: "Error in update!",
            error: updateUser?.error || updateUser.response,
          },
        };
      }

      return {
        response: {
          message: "User is update!",
          response: updateUser.response,
        },
      };
    } catch (error) {
      console.log("Error from Service:", error);
      return { error: error };
    }
  },
};
