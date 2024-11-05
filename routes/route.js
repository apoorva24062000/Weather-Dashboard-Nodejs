/**
 * Project Name: Weather Management System
 * @author: Apoorva Singh
 * @date: Feb 21, 2024
* -----------------------------------------------------------------------------
 * Description:
 * -----------------------------------------------------------------------------
 * This file defines routes for the Weather Management System using Express.
 * -----------------------------------------------------------------------------
 * Routes:
 * -----------------------------------------------------------------------------
 * - GET '/get-temperature': Route to fetch weather information for a specified location.
 * - POST '/registeruser': Route to handle user registration.
 * - POST '/loginuser': Route to handle user login.
 * - GET '/checkEmail/:email': Route to check for duplicate user email during registration.
 * - POST '/addcity': Route to add a city to the user's list.
 * - GET '/city': Route to fetch the user's list of cities.
 * - GET '/duplicatecity/:cityName': Route to check for the existence of a city in the user's list.
 * -----------------------------------------------------------------------------
 * Revision History:
 * -----------------------------------------------------------------------------
 * Modified By          Modified On         Description
 * Apoorva Singh        Feb 21, 2024         Initially created
 * -----------------------------------------------------------------------------
 */


const express = require("express");
const router = express.Router();
const weathercontroller = require("../controller/WeatherController")
const usercontroller = require("../controller/UserController")

router.get('/get-temperature', weathercontroller.getWeather);
router.post('/registeruser',usercontroller.register)
router.post('/loginuser',usercontroller.login)
router.get("/checkEmail/:email", usercontroller.duplicateEmail);
router.post("/addcity",weathercontroller.addcity)
router.get("/city",weathercontroller.getcity
)
router.get("/duplicatecity/:cityName",weathercontroller.duplicatecity)



module.exports = router;
