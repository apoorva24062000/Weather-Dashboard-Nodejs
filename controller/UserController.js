/**
 * Project Name : Weather Mangement System
 * @author  Apoorva Singh
 * @date    Feb 21, 2024
 * -----------------------------------------------------------------------------------
 * Description
 * -----------------------------------------------------------------------------------
 * - register: Function for handling user registration.
 * - login: Function for handling user login.
 * - duplicateEmail: Function for checking duplicate email.
 * -
 * -----------------------------------------------------------------------------------
 * Revision History
 * -----------------------------------------------------------------------------------
 * Modified By          Modified On         Description
 * Apoorva Singh       Feb 21,2024           Initially created
 
 * -----------------------------------------------------------------------------------
 */
const status = require('http-status');

const userService = require("../service/UserService");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/AuthMiddleware");

/**
 * @function register
 * @description Handles user registration.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {JSON} Response containing a success message or an error message.
 */
const register = async (req, res) => {
  global.log("debug", "IN");

  try {
    const { email, name,password } = req.body;

    const result = await userService.registerUser(email, name,password);
global.log("info",global.messages.userCreated)
    res
      .status(status.OK)
      .json({ message: global.messages.userCreated, result });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: global.messages.registerFail });
  }
  global.log("debug", "OUT");
};
/**
 * @function login
 * @description Handles user login.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {JSON} Response containing a success message, token, and user information or an error message.
 */
const login = async (req, res) => {
  global.log("debug", "IN");

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(status.BAD_REQUEST)
        .json({ error: global.messages.allFieldsRequired });
    }
    const user = await userService.loginUser(email);

    if (!user) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: global.messages.notFound });
    }
    const ispassvalid = await bcrypt.compare(password, user.password);

    if (!ispassvalid) {
      return res
        .status(status.UNAUTHORIZED)
        .json({ error: global.messages.invalidPass });
    }
    const token = generateToken(user);

    const userInfo = user.email;
    const userName = user.name
    global.log("info",global.messages.userLogin)

    res
      .status(status.OK)
      .json({ message: global.messages.userLogin, token, userInfo,userName });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: global.messages.loginFail });
      global.log("error",global.messages.loginFail )
  }
  global.log("debug", "OUT");
};

/**
 * @function duplicateEmail
 * @description Checks for duplicate email.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {JSON} Response indicating whether the email exists or not.
 */

const duplicateEmail = async (req, res) => {
  global.log("debug", "IN");

  const { email } = req.params;

  try {
    const user = await userService.loginUser(email);

    if (user) {
      res.status(status.OK).json({ exists: true, user });
    } else {
      res.status(status.OK).json({ exists: false, user: null });
    }
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: global.messages.duplicateFail });
      global.log("error",global.messages.duplicateFail)
  }

  global.log("debug", "OUT");
};

module.exports = {
  register,
  login,
  duplicateEmail,
};













































































