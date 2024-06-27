const sessionService = require("../services/sessionService");
const joi = require("joi");

const createSessionSchema = joi.object().keys({
  userID: joi.string().length(36).required(),
});

const deleteSessionSchema = joi.object().keys({
  userID: joi.string().length(36).required(),
});

// const findUserSchema = joi.object().keys({
//   userId: joi.array().single().required(),
// });

module.exports = {
  createSession: async (req, res) => {
    try {
      const validate = await createSessionSchema.validateAsync(req.body);
      const session = await sessionService.createSession(validate);

      if (session.error) {
        return res.send({
          error: session.error,
        });
      }

      return res.send({
        response: session.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },

  findSession: async (req, res) => {
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

    deleteSession: async (req, res) => {
      try {
        const validate = await deleteSessionSchema.validateAsync(req.query);
        console.log(validate);
        const session = await sessionService.deleteSession(validate.userId);

        if (user.error) {
          return res.send({
            error: session.error,
          });
        }

        return res.send({
          response: session.response,
        });
      } catch (error) {
        return res.send({
          error: error,
        });
      }
    },
};
