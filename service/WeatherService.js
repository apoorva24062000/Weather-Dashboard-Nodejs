/**
 * Project Name: Weather Management System
 * @author: Apoorva Singh
 * @date: Feb 21, 2024
 * -----------------------------------------------------------------------------
 * Description:
 * -----------------------------------------------------------------------------
 * This file contains functions related to managing user cities in the database.
 * - addcity: Function to add a city to the user's list in the database.
 * - fetchcity: Function to fetch the list of cities for a user from the database.
 * - hasCity: Function to check if a specific city exists in the user's list in the database.
 * -----------------------------------------------------------------------------
 * Revision History:
 * -----------------------------------------------------------------------------
 * Modified By          Modified On         Description
 * Apoorva Singh        Feb 21, 2024         Initially created
 * -----------------------------------------------------------------------------
 */



const pool = require("../data_access/database/db");


 

const addcity = async (user_id, city_name) => {
  try {
    // Check if user_id exists in the table
    const userExistsResult = await pool.query(
      "SELECT EXISTS(SELECT 1 FROM cities_info WHERE user_id = $1)",
      [user_id]
    );
    
    const userExists = userExistsResult.rows[0].exists;

    if (!userExists) {
      // If user_id doesn't exist, insert new row with user_id and city_name
      const city = [city_name]; // Store city_name in an array
      await pool.query(
        "INSERT INTO cities_info (user_id, city_name) VALUES ($1, $2)",
        [user_id, city]
      );
    } else {
      // Fetch existing cities for the user
      const existingCitiesResult = await pool.query(
        "SELECT city_name FROM cities_info WHERE user_id = $1",
        [user_id]
      );

      // Extract existing cities array from the result
      const existingCitiesArray = existingCitiesResult.rows[0]?.city_name || [];

      // Append the new city to the existing cities array
      const updatedCitiesArray = [...existingCitiesArray, city_name];

      // Update the user's cities in the database
      await pool.query(
        "UPDATE cities_info SET city_name = $1 WHERE user_id = $2",
        [updatedCitiesArray, user_id]
      );
    }
  } catch (error) {
    console.log(error.message);
    throw new Error("Error in adding city");
  }
};



// const addcity = async (user_id, city_name) => {
//   try {
//     // Fetch existing cities for the user
//     const existingCitiesResult = await pool.query(
//       "SELECT city_name FROM user_infor WHERE user_id = $1",
//       [user_id]
//     );

//     // Extract existing cities array from the result
//     const existingCitiesArray = existingCitiesResult.rows[0]?.city_name || [];

//     // Append the new city to the existing cities array
//     const updatedCitiesArray = [...existingCitiesArray, city_name];

//     // Update the user's cities in the database
//     await pool.query(
//       "UPDATE user_infor SET city_name = $1 WHERE user_id = $2",
//       [updatedCitiesArray, user_id]
//     );
//   } catch (error) {
//     console.log(error.message)
//     throw new Error("Error in adding city");
//   }
// };




/**
 * @function fetchcity
 * @description Fetches the list of cities for a user from the database.
 * @param {string} email - User's email address.
 * @returns {Array} An array of cities associated with the user.
 * @throws {Error} Throws an error if there is an issue fetching the cities.
 */
const fetchcity = async (email) => {
  try {
    const result = await pool.query(
      "SELECT * FROM cities_info  WHERE user_id = $1",
      [email]
    );
    return result.rows;
  } catch (error) {
    throw new Error("Error in Fetching cities");
  }
};

/**
 * @function hasCity
 * @description Checks if a specific city exists in the user's list in the database.
 * @param {string} user_id - User's ID.
 * @param {string} cityName - Name of the city to check.
 * @returns {boolean} Returns true if the city exists, otherwise false.
 * @throws {Error} Throws an error if there is an issue checking for the city.
 */
// const hasCity = async (user_id, cityName) => {
//   try {
//     const query ="SELECT city_name FROM cities_info WHERE user_id = $1"
      
//     const values = [user_id];

//     const result = await pool.query(query, values);
//     console.log(result)
//     return result.rows.length > 0;
//   } catch (error) {
//     throw new Error("Error in checking if city exists");
//   }
// };

const hasCity = async(user_id,cityName) =>{
  try{
    
    const userExistsResult = await pool.query(
      "SELECT EXISTS(SELECT 1 FROM cities_info WHERE user_id = $1)",
      [user_id]
    );

    const userExists = userExistsResult.rows[0].exists;
    if(!userExists){
      return false
    }
const query = "SELECT city_name FROM cities_info WHERE user_id = $1"
const values = [user_id]
const result = await pool.query(query, values);
const cities = result.rows[0].city_name
for(var i =0; i < cities.length;i++){
 if(cities[i]  === cityName){
  return true;
 }
}
return false;
  }
  catch(error){
    throw new Error("Error in checking if city exists");

  }

}




module.exports = {
  addcity,
  fetchcity,
  hasCity,
};
