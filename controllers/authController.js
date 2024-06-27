const joi = require("joi");
const [encryptPassword] = require("../services/authService");

const loginSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
});

const logoutSchema = joi.object().keys({
  id: joi.number().required(),
});

const restPasswordSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
  confirm_password: joi.ref("password"),
});

module.exports = {
  login: async (req, res) => {
    try {
      const validate = await loginSchema.validateAsync(req.body);
      var password = await encryptPassword(validate.password);
      console.log("Password is: ", password);
      return res.send({
        message: "This is signin API",
        data: validate,
      });
    } catch (error) {
      return res.send({
        message: "This is signin API",
        data: error.message,
      });
    }
  },

  logout: async (req, res) => {
    try {
      const validate = await logoutSchema.validateAsync(req.body);
      return res.send({
        message: "This is Logout API",
        data: validate,
      });
    } catch (error) {
      return res.send({
        message: "This is Logout API",
        data: error.message,
      });
    }
  },

  restPassword: async (req, res) => {
    try {
      const validate = await restPasswordSchema.validateAsync(req.body);
      return res.send({
        message: "This is signin API",
        data: validate,
      });
    } catch (error) {
      return res.send({
        message: "This is signin API",
        data: error.message,
      });
    }
  },
};
