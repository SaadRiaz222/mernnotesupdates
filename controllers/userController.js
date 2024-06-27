const userService = require("../services/userService");
const joi = require("joi");

const createUserSchema = joi.object().keys({
  userName: joi.string().min(3).max(34).required(),
  firstName: joi.string().min(3).max(34).required(),
  lastName: joi.string().min(3).max(34).required(),
  password: joi.string().min(3).max(34).required(),
});

const updateUserSchema = joi.object().keys({
  userId: joi.string().length(36).required(),
  userName: joi.string().min(3).max(34),
  firstName: joi.string().min(3).max(34).required(),
  lastName: joi.string().min(3).max(34).required(),
});

const findUserSchema = joi.object().keys({
  userId: joi.array().single().required(),
});

module.exports = {
  createUser: async (req, res) => {
    try {
      const validate = await createUserSchema.validateAsync(req.body);
      const user = await userService.createUser(validate);

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

  findUser: async (req, res) => {
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
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();

      if (users.error) {
        return res.send({
          error: users.error,
        });
      }

      return res.send({
        response: users.response,
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
