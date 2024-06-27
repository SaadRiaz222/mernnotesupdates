const { models } = require("./index");

module.exports = {
  createSession: async (body) => {
    try {
      const session = await models.sessions.create({ ...body });

      return {
        response: session,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  deleteSession: async (userId) => {
    try {
      const session = models.sessions.destroy({ where: { userID: userId } });

      return {
        response: session,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  findSession: async (body) => {
    try {
      const session = await models.sessions.findOne({     
        where: {
          [Op.or]: [
            { userID: body.userId },
            { sessionID: body.sessionId },
            { token: body.token },
          ]
        }
      });

      return {
        response: session,
      };
    } catch (error) {
      console.log("Model Error:", error);
      return {
        error: error,
      };
    }
  },
};
