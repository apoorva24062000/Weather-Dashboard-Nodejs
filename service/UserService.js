/**
 * Project Name: Weather Management System
 * @author: Apoorva Singh
 * @date: Feb 21, 2024
 * Description:
 * -----------------------------------------------------------------------------
 * This file contains functions related to user authentication and database operations.
 * - registerUser: Function to handle user registration by hashing the password and storing user details.
 * - loginUser: Function to handle user login by fetching user details from the database.
 * -----------------------------------------------------------------------------
 * Revision History:
 * -----------------------------------------------------------------------------
 * Modified By          Modified On         Description
 * Apoorva Singh        Feb 21, 2024         Initially created
 * -----------------------------------------------------------------------------
 */




const bcrypt = require("bcrypt");
const pool = require("../data_access/database/db");
const UserQueries = require("../data_access/queries/UserQueries");




/**
 * @function registerUser
 * @description Registers a new user by hashing the password and storing user details in the database.
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @returns {Object} The created user data.
 * @throws Will throw an error if there's an issue with the registration process.
 */
const registerUser = async (email,name, password) => {
  try {
    // Hash the user's password before storing in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user details in the database
    const result = await pool.query(UserQueries.register, [
      email,
     name,
      hashedPassword,
    ]);
    return result.rows[0]; // Assuming the query returns the created user data
  } catch (error) {
    throw error;
  }
};

/**
 * @function loginUser
 * @description Retrieves user details from the database based on the provided email.
 * @param {string} email - User's email address.
 * @returns {Object} The user details.
 * @throws Will throw an error if there's an issue with the login process.
 */
const loginUser = async (email) => {
  try {
    // Fetch user details from the database based on the email
    const result = await pool.query(UserQueries.login, [email]);
    
    // Return the user details
    return result.rows[0];
  } catch (error) {

    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser
};
