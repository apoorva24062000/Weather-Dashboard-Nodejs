/**
 * Project Name: Weather Management System
 * @author: Apoorva Singh
 * @date: Feb 21, 2024
 * -----------------------------------------------------------------------------
 * Description:
 * -----------------------------------------------------------------------------
 * This file contains backend functionality for managing weather-related features.
 * - getWeather: Function to fetch weather information for a specified location.
 * - addcity: Function to add a city to the user's list.
 * - getcity: Function to fetch the user's list of cities.
 * - duplicatecity: Function to check if a city already exists in the user's list.
 * -----------------------------------------------------------------------------
 * Revision History:
 * -----------------------------------------------------------------------------
 * Modified By          Modified On         Description
 * Apoorva Singh        Feb 21, 2024         Initially created
 * -----------------------------------------------------------------------------
 */


const status = require('http-status');

const axios = require("axios");
const jwt = require("jsonwebtoken");
const apiKey = "c5424ee0df0a0d2e878034dda38e13c8";
const service = require("../service/WeatherService");
/**
 * @function getWeather
 * @description Handles fetching weather information for a specified location.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {JSON} Response containing weather information or an error message.
 */
async function getWeather(req, res) {
  let location = req.query.location;

  if (!location) {
    return res.status(400).json({ error: "Please provide a location." });
  }
  location = location.trim();

  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );

    if (response.data.main && response.data.main.temp) {
      const temperatureCelsius = response.data.main.temp;
      const temperatureFahrenheit =
        convertCelsiusToFahrenheit(temperatureCelsius);
      const humidity = response.data.main.humidity;
      const weatherDescription = response.data.weather[0].description;
      const windSpeed = response.data.wind.speed;
      const sunriseTimestamp = response.data.sys.sunrise;
      const sunsetTimestamp = response.data.sys.sunset;

      res.json({
        location,
        temperature: {
          celsius: temperatureCelsius,
          fahrenheit: temperatureFahrenheit,
        },
        humidity,
        weatherDescription,
        windSpeed,
        sunrise: formatTimestamp(sunriseTimestamp),
        sunset: formatTimestamp(sunsetTimestamp),
      });
    } else {
      res.status(404).json({
        error:
          "Temperature information not available for the specified location",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(status.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
}

function convertCelsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function formatTimestamp(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString();
}
/**
 * @function addcity
 * @description Handles adding a city to the user's list.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {JSON} Response containing a success message or an error message.
 */
const addcity = async (req, res) => {
  global.log("debug", "IN");

  try {
    const { cityName } = req.body;
console.log(cityName)
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(status.UNAUTHORIZED).json({ error: global.messages.loginFail });
    }

    jwt.verify(token, global.settings.KEY, async (err, decodedToken) => {
      if (err) {
        return res
          .status(status.UNAUTHORIZED)
          .json({ error: global.messages.unauthorizedToken });
      }
      const user_id = decodedToken.userId;

      await service.addcity(user_id, cityName);

      global.log("info",global.messages.cityAdded)

      res.status(status.OK).json({ message: global.messages.cityAdded });
      global.log("info", global.messages.cityAdded)
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ error: global.messages.cityFail });
    global.log("error", global.messages.cityFail)
    
  }
  global.log("debug", "OUT");

};
/**
 * @function getcity
 * @description Handles fetching the user's list of cities.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {JSON} Response containing the user's list of cities or an error message.
 */
const getcity = async (req, res) => {
  global.log("debug", "IN");

  try {
    const token = req.headers["authorization"];
    console.log(token);

    if (!token) {
      return res.status(status.UNAUTHORIZED).json({ error: global.messages.loginFail });
    }
    global.log("error",global.messages.loginFail)

    jwt.verify(token, global.settings.KEY, async (err, decodedToken) => {
      if (err) {
        return res
          .status(status.UNAUTHORIZED)
          .json({ error: global.messages.unauthorizedToken });
      }
      const email = decodedToken.userId;

      const cities = await service.fetchcity(email);
      global.log("info",global.messages.cityFetched )
      res.status(status.OK).json({ cities, message: global.settings.cityFetched });
     
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ error: global.messages.cityFetchedFail });
    global.log("error",global.messages.cityFetchedFail)
  }
  global.log("debug", "OUT");

};
/**
 * @function duplicatecity
 * @description Checks for the existence of a city in the user's list.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {JSON} Response indicating whether the city exists or not.
 */
const duplicatecity = async (req, res) => {
  global.log("debug", "IN");

  const { cityName } = req.params;

  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ error: global.messages.loginFail });
    }

    jwt.verify(token, global.settings.KEY, async (err, decodedToken) => {
      if (err) {
        return res
          .status(status.UNAUTHORIZED)
          .json({ error: global.messages.unauthorizedToken });
      }

      const user_id = decodedToken.userId;
      const cityExists = await service.hasCity(user_id, cityName);

      if (cityExists) {
        res
          .status(global.settings.HTTP_OK)
          .json({ exists: true, cities: [cityName] });
      } else {
        res
          .status(global.settings.HTTP_OK)
          .json({ exists: false, cities: null });
      }
    });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .
      json({ error: global.messages.duplicateFail });
      global.log("error",global.messages.duplicateFail)
  }

  global.log("debug", "OUT");

};

module.exports = {
  getWeather,
  addcity,
  getcity,
  duplicatecity,
};
