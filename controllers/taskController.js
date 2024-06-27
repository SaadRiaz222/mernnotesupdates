const taskService = require("../services/taskService");
const joi = require("joi");

const createTaskSchema = joi.object().keys({
  userID: joi.string().length(36).required(),
  title: joi.string().min(3).max(255).required(),
  description: joi.string().min(3).max(1000).required(),
});

// const updateUserSchema = joi.object().keys({
//   userId: joi.string().length(36).required(),
//   userName: joi.string().min(3).max(34),
//   firstName: joi.string().min(3).max(34).required(),
//   lastName: joi.string().min(3).max(34).required(),
// });

// const findUserSchema = joi.object().keys({
//   userId: joi.array().single().required(),
// });

module.exports = {
  createTask: async (req, res) => {
    try {
      const validate = await createTaskSchema.validateAsync(req.body);
      const task = await taskService.createTask(validate);

      if (task.error) {
        return res.send({
          error: task.error,
        });
      }

      return res.send({
        response: task.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const validate = await findUserSchema.validateAsync(req.body);
      console.log(validate);
      const user = await userService.deleteUser(validate.userId);

      if (user.error) {
        return res.send({
          error: user.error,
        });
      }

      return res.send({
        response: user.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },

  findTask: async (req, res) => {
    try {
      const validate = await findUserSchema.validateAsync(req.query);
      console.log(validate.userId);
      const user = await userService.findUser(validate.userId);

      if (user.error) {
        return res.send({
          error: user.error,
        });
      }

      return res.send({
        response: user.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
  getAllTasks: async (req, res) => {
    try {
      const tasks = await taskService.getAllTasks();

      if (tasks.error) {
        return res.send({
          error: tasks.error,
        });
      }

      return res.send({
        response: tasks.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const validate = await updateUserSchema.validateAsync(req.body);
      const user = await userService.updteUser(validate);
      console.log("user:", user);

      if (user.error) {
        return res.send({
          error: user.error,
        });
      }

      return res.send({
        response: user.response,
      });
    } catch (error) {
      console.log("Error from Controll:", error);
      return res.send({
        error: error,
      });
    }
  },
};
