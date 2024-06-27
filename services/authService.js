require("dotenv").config();

const userModel = require("../models/userModel");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

module.exports = {
  login: async (body) => {
    try {
      const isUser = await userModel.getUser(body.userName);
      if (isUser.error || !isUser.response) {
        return {
          error: {
            error: isUser?.error || isUser.response,
            message: "User Not Found!",
          },
        };
      }
      const isValid = await compare(
        body.password,
        isUser.response.dataValues.password
      );

      if (!isValid) {
        return {
          response: {
            token: "undefined",
            message: "invalid credentials",
          },
        };
      }

      delete isUser.response.dataValues.password;
      const token = sign(isUser.response.dataValues, process.env.SECRET, {
        expiresIn: 30,
      });

      //store in session table

      return {
        response: {
          token: token,
          message: "loggen in successfully!",
        },
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
};