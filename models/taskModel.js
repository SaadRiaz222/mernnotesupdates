const { models } = require("./index");

module.exports = {
  index: async (body) => {
    try {
      const task = await models.tasks.findAll({
        attributes: {
          exclude: ["createdAt", "userID"],
        },
        include: [
          {
            model: models.users,
            attributes: ["userID", "userName"],
          },
        ],
      });

      return {
        response: task,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  createTask: async (body) => {
    try {
      console.log("I am in Model",body)
      const task = await models.tasks.create({ ...body });

      return {
        response: task,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
};
