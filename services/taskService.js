const taskModel = require("../models/taskModel");
const { v4: uuid } = require("uuid");

module.exports = {
  // Index
  getAllTasks: async () => {
    try {
      const user = await taskModel.index();
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

  createTask: async (body) => {
    try {
      body.taskID = uuid();
      const task = await taskModel.createTask(body);

      if (task.error) {
        return {
          error: task.error,
        };
      }

      return {
        response: task.response,
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
      const user = await taskModel.findUser(userId);
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

  deleteUser: async ({ id }) => {
    try {
      const deleteUser = await taskModel.deleteUser(id);

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
      const updateUser = await taskModel.updateUser(body);
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
