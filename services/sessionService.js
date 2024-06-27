const sessionModel = require("../models/sessionModel");
const { v4: uuid } = require("uuid");

module.exports = {
  
  createSession: async (body) => {
    try {
      body.sessionID = uuid();
      body.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJiMTVkYjgwNy0yODk2LTQ5YzUtOWU4Ni0xMzBjNmZkMjJhMjAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.9bt497cdtw6JKBvRXYzlgNQ7B4QH8yU9CkQkdvv3MSs"
      const session = await sessionModel.createSession(body);

      if (session.error) {
        return {
          error: session.error,
        };
      }

      return {
        response: session.response,
      };
    } catch (error) {
      console.log("Error in Service", error);
      return {
        error: error,
      };
    }
  },

  findSession: async (body) => {
    try {
      const user = await taskModel.findUser(body);

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

  deleteSession: async (body) => {
    try {
      const deleteSession = await sessionModel.deleteSession(body.userId);

      if (deleteSession.error || !deleteSession.response) {
        return {
          error: {
            message: "Error in deleting user",
            error: deleteSession?.error || deleteSession.response,
          },
        };
      }

      return {
        response: {
          message: "User is deleted!",
          response: deleteSession.response,
        },
      };
    } catch (error) {
      return { error: error };
    }
  },

};
