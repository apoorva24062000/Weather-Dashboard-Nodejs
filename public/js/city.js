let timeout = setTimeout(() => {
    const errorDiv = document.getElementById("error");
            errorDiv.style.display = "none";
    //   showToast("Failed to load weather forecast. Please try again later.");
    const h2Element = document.querySelector('h2');
              h2Element.style.display="block";
      console.log("Apoorvaaaaaaa")
  }, 60000); 


const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");
const goBackToList = document.querySelector(".alt-text-end");
let isStatus=false;
// Function to show non-blurring loader
function showNonBlurLoader() {
  const loader = document.getElementById("nonBlurLoader");
  loader.style.display = "block";
}

// Function to hide non-blurring loader
function hideNonBlurLoader() {
  const loader = document.getElementById("nonBlurLoader");
  loader.style.display = "none";
}

document
  .getElementById("addCityForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    showLoader();

    // Get the city name from the input field
    const cityName = document.getElementById("citySelectModal").value;
    const countrySelectModal =
      document.getElementById("countrySelectModal").value;
    if (cityName === "") {
      showToast("City cannot be empty ");
      setTimeout(() => {
        hideLoader();
      }, 1000);
      return;
    }
    console.log(cityName);
    // Validate the city name to disallow numbers, special characters, and check for a reasonable pattern
    // const hasNumbers = /\d/.test(cityName);
    // const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(cityName);
    // const hasRepetition = /(.)\1{2,}/.test(cityName);
    // const hasSpaces = /\s/.test(cityName);

    // if (hasNumbers || hasSpecialChars || hasRepetition || hasSpaces) {
    //     // Display an error message or handle invalid input
    //     showToast('Invalid city name. Please enter a valid city name without numbers, special characters, and unnecessary repetition.', "error");
    //     document.getElementById('citySelectModal').value = '';

    //     return;

    // }

    // Prepare the data to send in the request body
    const data = {
      cityName,
    };

    const token = window.sessionStorage.token;
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    try {
      // // Make an HTTP GET request to check if the city already exists
      const checkCityResponse = await axios.get(
        `http://localhost:3000/user/duplicatecity/${cityName}`,
        config
      );

      if (checkCityResponse.data.exists) {
        // City already exists, display a message

        showToast(`City '${cityName}' is already added.`, "error");
        hideLoader();
        document.getElementById("citySelectModal").value = "";
        document.getElementById("countrySelectModal").value = "";
      } else {
        // City does not exist, proceed with adding the city
        const addCityResponse = await axios.post(
          "http://localhost:3000/user/addcity",
          data,
          config
        );

        // Handle the response from the server
        console.log(addCityResponse.data);
        const addCityModal = new bootstrap.Modal(
          document.getElementById("addCityModal")
        );
        addCityModal.hide();

        document.getElementById("citySelectModal").value = "";
        document.getElementById("countrySelectModal").value = "";
        isStatus=true;
        await fetchAndDisplayWeatherForCityList(cityName);
        if(isStatus){
            setTimeout(() => {
                hideLoader();
                showToast(`City '${cityName}' is  added.`, "success");
              }, 9000);
            } 
    
      }

      setTimeout(() => {
        hideLoader();
      }, 9000);
    
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error response from the server
      showToast("Error adding city. Please try again later.", "error");
      document.getElementById("citySelectModal").value = "";
      document.getElementById("countrySelectModal").value = "";
      setTimeout(() => {
        hideLoader();
      }, 9000);
    }
  });

// document.getElementById('myListButton').addEventListener('click', async function () {
//     try {
//         const token = window.sessionStorage.token;
//         const response = await fetch('http://localhost:3000/user/city', {
//             headers: {
//                 Authorization: `${token}`,
//             },
//         });
//         const result = await response.json();
//         const cities = result.cities;

//         if (cities.length === 0) {
//             console.log('User has no cities in the list.');
//             return;
//         }

//         const apiKey = 'c5424ee0df0a0d2e878034dda38e13c8';

//         cities.forEach(async function (city) {
//             try {
//                 const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.city_name}&appid=${apiKey}`);
//                 const weatherInfo = await weatherResponse.json();
//                 // console.log(weatherResponse)
//                 console.log(weatherInfo)

//                 // Check if weather info is undefined
//                 if (weatherInfo.cod === "404")  {
//                     return;
//                 }

//                 // Display the weather information only if it's not already displayed
//                 if (!isCityDisplayed(city.city_name)) {
//                     displayWeatherCard(city.city_name, weatherInfo);
//                 }
//             } catch (error) {
//                 console.error(`Error fetching weather for ${city.city_name}:`, error);
//             }
//         });
//     } catch (error) {
//         console.error('Error fetching city list:', error);
//     }
// });

function hideLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}

function showLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "block";
}
const citiesWithErrors = new Set();

async function fetchAndDisplayWeatherForCityList(x) {
  try {
    const token = window.sessionStorage.token;
    const response = await fetch("http://localhost:3000/user/city", {
      headers: {
        Authorization: `${token}`,
      },
    });
    const result = await response.json();
    const cities = result.cities;
    console.log(cities);

    if (cities.length === 0) {
      console.log("User has no cities in the list.");
      hideLoader();
      return;
    }

    const apiKey = "c5424ee0df0a0d2e878034dda38e13c8";
    const city_info = cities[0].city_name;
    console.log(city_info);
    for (const city_name of city_info) {
      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}`
        );
        clearTimeout(timeout);

        const weatherInfo = await weatherResponse.json();

        // // Check if weather info is undefined
        // if (weatherInfo.cod === "404") {
        //     console.log(`Weather for ${city_name} not found.`, "error");
        //     showToast(`Weather for ${city_name} not found.`, "error");
        //     citiesWithWeatherNotFound.push(city_name); // Ad
        //     continue;
        // }

        
        if (weatherInfo.cod === "404") {
          if (!citiesWithErrors.has(city_name)) {
            // showToast(`Weather for ${city_name} not found.`,'error');
            // toastr.error(`Weather for ${city_name} not found.`); // Show toastr error message
            if(city_name===x){
         showToast(`Weather for ${city_name} not found.`, "error");
         isStatus=false;
            }
            citiesWithErrors.add(city_name); // Add city to set to indicate error has been shown
            
          
        
          continue;
        }
    }
        console.log('hii',isStatus)
       

        // Display the weather information only if it's not already displayed
        if (!isCityDisplayed(city_name)) {
          displayWeatherCard(city_name, weatherInfo);
        }
      } catch (error) {
       
        console.error(`Error fetching weather for ${city_name}:`, error);
      }
    }
  } catch (error) {
    console.error("Error fetching city list:", error);
  }
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", async function () {
  showLoader();

  await fetchAndDisplayWeatherForCityList();
});

// Function to check if a city is already displayed
function isCityDisplayed(cityName) {
  const weatherCards = document.querySelectorAll(".weather-cards .card h3");
  for (let i = 0; i < weatherCards.length; i++) {
    if (weatherCards[i].textContent === cityName) {
      return true;
    }
  }
  return false;
}

function getDisplayedCardsCount() {
  const weatherCards = document.querySelectorAll(".weather-cards .card h3");
  return weatherCards.length + 1;
}

// Function to parse OpenWeatherMap API response
function parseWeatherData(apiResponse) {
  // Implement parsing logic based on the structure of the OpenWeatherMap API response
  // Extract relevant information like temperature, wind speed, humidity, etc.
  return {
    temperature: apiResponse.main.temp,
    windSpeed: apiResponse.wind.speed,
    humidity: apiResponse.main.humidity,
    // Add other properties as needed
  };
}

let totalCities; // Define totalCities globally
let displayedWeatherCardsCount = 0; // Initialize counter for displayed weather cards

// Function to display weather information in a card
function displayWeatherCard(city, weatherInfo) {
  const weatherCardsContainer = document.getElementById("weatherCards");

  // Extract relevant information from the weatherInfo object
  const temperature = weatherInfo.main?.temp;
  const temperatureInCelsius = temperature
    ? (temperature - 273.15).toFixed(2)
    : null;

  const windSpeed = weatherInfo.wind?.speed;
  const humidity = weatherInfo.main?.humidity;

  // Create a new li element for the weather card
  const cardElement = document.createElement("li");
  cardElement.classList.add("card");

  // Set the content of the card
  cardElement.innerHTML = `
    <h3  >${city}</h3>
    <div class="details with-bullets">

        <h6>Temperature: ${temperatureInCelsius} °C</h6>
        <h6>Wind: ${windSpeed} m/s</h6>
        <h6> Wind Direction : ${weatherInfo.wind.deg}°</h6>
        <h6> Weather Description: ${weatherInfo.weather[0].description}<h6>
        </div>

    `;

  cardElement.addEventListener("click", async () => {
    // Call a function to fetch and display the 10-day forecast for the selected city
    const { latitude, longitude } = await getCityCoordinates(city);

    // // Call a function to fetch and display the 10-day forecast for the selected city
    await fetchAndDisplayExtendedForecast(city, latitude, longitude);
    // getCityCoordinates(city)
  });
  totalCities = getDisplayedCardsCount();

  // Append the card to the weather cards container
  weatherCardsContainer.appendChild(cardElement);

  displayedWeatherCardsCount++;

  // Check if all weather cards are displayed
  if (displayedWeatherCardsCount === totalCities) {
    setTimeout(hideLoader, 3000);
  }
  console.log(displayedWeatherCardsCount);
  console.log(totalCities, "heloooooo");
}

function showToast(message, type) {
  const toaster = document.getElementById("toaster");
  const toasterMessage = document.getElementById("toasterMessage");

  toasterMessage.textContent = message;
  toaster.style.backgroundColor =
    type === "success" ? "rgba(0, 135, 68, 1)" : "rgba(217, 43, 43, 1)";
  toaster.style.display = "block";

  setTimeout(() => {
    closeToaster();
  }, 5000); // Close the toaster after 5 seconds
}

function closeToaster() {
  const toaster = document.getElementById("toaster");
  toaster.style.display = "none";
}
// document.getElementById('logoutButton').addEventListener('click', function () {
//     // Perform logout actions, such as clearing session storage or redirecting to the logout endpoint
//     // For example:
//     window.sessionStorage.clear(); // Clear the session storage
//     window.location.href = '/'; // Redirect to the logout endpoint
// });

document
  .getElementById("logoutButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Show a SweetAlert confirmation dialog
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear user-related information from sessionStorage
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("userName");

        // Redirect to the logout page or perform any other necessary actions
        window.location.href = "/";
      }
    });
  });

const createWeatherCard = (data, i, cityName, timeStamp) => {
  const addButtonDiv = document.querySelector(".text-end");
  // currentWeatherDiv.style.display = "block";
  addButtonDiv.style.display = "none";
  goBackToList.style.display = "block";
  const formatDate = (inputDate) => {
    const options = { weekday: "long", day: "numeric" };
    return new Date(inputDate).toLocaleDateString(undefined, options);
  };
  const getWeatherDescription = (weatherCode) => {
    return weatherDescriptions[weatherCode] || "Unknown";
  };
  if (timeStamp === "current") {
    // HTML for the main weather card
    const timeBeforeT = data.time.substring(0, data.time.indexOf("T"));
    const weatherDescription = getWeatherDescription(data.weather_code);

    return `<div class="card with-bullets">
                    <h2 >${cityName} (Today)</h2>
                    <h6><b>Temperature</b>: ${data.temperature_2m}°C</h6>
                    <h6>Wind-Speed: ${data.wind_speed_10m} km/h</h6>
                    <h6>Wind-Direction: ${data.wind_direction_10m}° </h6>
                  

                    <h6>Weather-Description: ${weatherDescription}</h6>
                </div>
            `;
  } else {
    // HTML for the other ten day forecast card
    const formattedDate = formatDate(data.time[i]);
    const weatherDescription = getWeatherDescription(data.weather_code[i]);

    return `<li class="card  with-bullets">
                    <h3 >${formattedDate}</h3>
                    <h6>Temperature: ${data.temperature_2m_max[i]}°C</h6>
            
                    <h6>Wind-Speed: ${data.wind_speed_10m_max[i]} km/h</h6>
                    <h6>Wind-Direction: ${data.wind_direction_10m_dominant[i]}° </h6>
                    <h6>Weather-Description: ${weatherDescription}</h6>
                   

                </li>`;
  }
};

// Function to fetch and display the 10-day forecast for a given city
async function fetchAndDisplayExtendedForecast(city, latitude, longitude) {
  try {
    const forecastResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code,rain,showers,wind_direction_10m&forecast_days=11&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_speed_10m_min,weather_code,precipitation_sum,wind_direction_10m_dominant`
    );
    clearTimeout(timeout);

    const forecastData = await forecastResponse.json();

    console.log(forecastData);
    //  currentWeatherDiv.innerHTML = "";
    weatherCardsDiv.innerHTML = "";
    const htmlHeader = createWeatherCard(
      forecastData.current,
      -1,
      city,
      "current"
    );

    weatherCardsDiv.insertAdjacentHTML("beforeend", htmlHeader);

    for (let i = 1; i < 11; i++) {
      const htmlBody = createWeatherCard(
        forecastData.daily,
        i,
        city,
        "forecast"
      );
      weatherCardsDiv.insertAdjacentHTML("beforeend", htmlBody);
    }

    // Implement logic to display the 10-day forecast for the selected city
    // ...
  } catch (error) {
    console.error(`Error fetching 10-day forecast for ${city}:`, error);
  }
}

const getCityCoordinates = async (city) => {
  try {
    const apiKey = "c5424ee0df0a0d2e878034dda38e13c8";
    const geocodingResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );
    const geocodingData = await geocodingResponse.json();

    // Extract latitude and longitude from the geocoding response
    const latitude = geocodingData[0]?.lat;
    const longitude = geocodingData[0]?.lon;
    console.log(latitude, "hiii");
    console.log(longitude);

    if (latitude && longitude) {
      return { latitude, longitude };
    } else {
      throw new Error(`Coordinates not found for ${city}`);
    }
  } catch (error) {
    console.error(`Error fetching coordinates for ${city}:`, error);
    throw error;
  }
};

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog and depositing rime fog",
  48: "Fog and depositing rime fog",
  51: "Drizzle: Light intensity",
  53: "Drizzle: Moderate intensity",
  55: "Drizzle: Dense intensity",
  // ... (add more mappings as needed)
  99: "Thunderstorm with heavy hail",
  80: "Rain showers",
  95: "Thunderstorm",
  71: "Snow fall",
  73: "Snow fall",
  75: "Snow fall",
  61: "Rain",
};