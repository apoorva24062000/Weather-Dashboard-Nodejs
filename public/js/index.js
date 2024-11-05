// let timeout = setTimeout(() => {
//     const errorDiv = document.getElementById("error");
//             errorDiv.style.display = "none";
//     //   showToast("Failed to load weather forecast. Please try again later.");
//     const h2Element = document.querySelector('h2');
//               h2Element.style.display="block";
//       console.log("Apoorvaaaaaaa")
//   }, 60000); 


const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");





document.addEventListener("DOMContentLoaded", () => {
    

    getUserCoordinates(); // Call getUserCoordinates when the document is fully loaded
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            getWeatherDetailsAndMap(latitude, longitude);
        },
        error => {
            if (error.code === error.PERMISSION_DENIED) {
                showToast("Geolocation request denied. Please reset location permission to grant access again.");
            } else {
                showToast("Geolocation request error. Please reset location permission.");
            }
        }
    );
});



const API_KEY = "c5424ee0df0a0d2e878034dda38e13c8"; // API key for OpenWeatherMap API


 // Function to create and display a Leaflet map
 const createMap = (latitude, longitude) => {
    const map = L.map('map').setView([latitude, longitude], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    console.log(map);



    return map;
};

// Function to get weather details and display on the map
// const getWeatherDetailsAndMap = (latitude, longitude) => {
//     const map = createMap(latitude, longitude);
//     console.log('hi',map    );
//     const numberOfCities = 10; 

//     // Fetch weather data for the current location
//     const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

//     fetch(WEATHER_API_URL)
//         .then(response => response.json())
//         .then(data => {

//             // Add marker for the current location on the map
//             L.marker([latitude, longitude]).addTo(map)
//                 .bindPopup(`<b>${data.name}</b><br>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C`);
                

//             // Fetch weather data for 8 nearby cities (you can adjust this as needed)
//             const NEARBY_CITIES_API_URL = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=${numberOfCities}&appid=${API_KEY}`;

//             fetch(NEARBY_CITIES_API_URL)
//     .then(response => response.json())
//     .then(nearbyCities => {
//         // Loop through nearby cities and add markers to the map
//         nearbyCities.list.forEach(city => {
//             console.log(city,"infooooooo")

//             const cityLatLng = [city.coord.lat, city.coord.lon];
//             const cityWindSpeedKmPerHour = (city.wind.speed * 3.6).toFixed(2);

//             const popupContent = `
//                 <b>${city.name}</b><br>
//                 Temperature: ${(city.main.temp - 273.15).toFixed(2)}°C<br>
//                 Wind Speed: ${cityWindSpeedKmPerHour} km/h<br>
//                 Wind Direction :${city.wind.deg}°<br>
//                 Weather Description: ${city.weather[0].description}<br>
              
                 
//             `;
//             L.marker(cityLatLng).addTo(map)
//                 .bindPopup(popupContent);
//         });
//     })
//     .catch(() => {
//         showToast("An error occurred while fetching nearby cities!");
//     });

//         })
//         .catch(() => {
//             showToast("An error occurred while fetching the weather details!");
//         });
// };
let map ;

// const getWeatherDetailsAndMap = (latitude, longitude) => {
//     const numberOfCities = 9;
//     map= createMap(latitude, longitude);
//     // Fetch weather data for the current location
//     const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

//     fetch(WEATHER_API_URL)
//         .then(response => response.json())
//         .then(data => {


//             // Fetch weather data for 8 nearby cities (you can adjust this as needed)
//             const NEARBY_CITIES_API_URL = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=${numberOfCities}&appid=${API_KEY}`;

//             fetch(NEARBY_CITIES_API_URL)
//                 .then(response => response.json())
//                 .then(nearbyCities => {
//                     // Loop through nearby cities and use the FontAwesome cloud icon for all markers
//                     nearbyCities.list.forEach(city => {
//                         const cityLatLng = [city.coord.lat, city.coord.lon];

//                         const popupContent = `
//                             <b>${city.name}</b><br>
//                             Temperature: ${(city.main.temp - 273.15).toFixed(2)}°C<br>
                            
//                             Wind Speed: ${(city.wind.speed * 3.6).toFixed(2)} km/h<br>
//                             Wind Direction: ${city.wind.deg}°<br>
//                             Weather Description: ${city.weather[0].description}<br>
//                         `;
//                         const weatherIconUrl = `https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`;
//                         console.log(weatherIconUrl)

//                         const cityIcon = L.Icon({
//                             iconUrl: weatherIconUrl,
//                             iconSize: [35, 35], // Adjusted size to 35x35
//                             iconAnchor: [17, 35],
//                             popupAnchor: [0, -20] 
//                         });

//                         L.marker(cityLatLng, { icon: cityIcon }).addTo(map)
//                             .bindPopup(popupContent);
//                     });

//                     const topCitiesweatherCardsDiv = document.querySelector(".topCities-weather-cards");
//                     topCitiesweatherCardsDiv.innerHTML = "";

//                     for(let i=0; i < 8; i++){
//                         const htmlBody = createWeatherCardTopCity(nearbyCities, i);
//                         topCitiesweatherCardsDiv.insertAdjacentHTML("beforeend", htmlBody);
//                         // Add click event listener to each card
//                         const cardElement = topCitiesweatherCardsDiv.lastElementChild;
//                         cardElement.addEventListener('click', () => {
//                         const cityName = cardElement.getAttribute('data-city');
//                         displayWeatherCardCity(cityName);
//                 });
//                     }
//                 })
//                 .catch((error) => {
//                     // showToast("An error occurred while fetching nearby cities!");
//                     console.log(error.message)
//                 });
//         })
//         .catch(() => {
//             showToast("An error occurred while fetching the weather details!");
//         });
// };

const getWeatherDetailsAndMap = (latitude, longitude) => {
    const numberOfCities = 10;
    map = createMap(latitude, longitude);
   

    // Fetch weather data for 8 nearby cities (you can adjust this as needed)
    const NEARBY_CITIES_API_URL = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=${numberOfCities}&appid=${API_KEY}`;

    fetch(NEARBY_CITIES_API_URL)
        .then(response => response.json())
        .then(nearbyCities => {
            

            // Display the map container
            document.getElementById("map").style.display = "block";
            const topCitiesweatherCardsDiv = document.querySelector(".topCities-weather-cards");
            topCitiesweatherCardsDiv.innerHTML = "";

            for (let i = 0; i < numberOfCities; i++) {
                const city = nearbyCities.list[i];
                console.log(city,"cityyyyylisttt")
                const cityLatLng = [city.coord.lat, city.coord.lon];

                const popupContent = `
                    <b>${city.name}</b><br>
                    Temperature: ${(city.main.temp - 273.15).toFixed(2)}°C<br>
                    
                    Wind Speed: ${(city.wind.speed * 3.6).toFixed(2)} km/h<br>
                    Wind Direction: ${city.wind.deg}°<br>
                    Weather Description: ${city.weather[0].description}<br>
                `;
                const weatherIconUrl = `https://openweathermap.org/img/wn/${city.weather[0].icon}.png`;

                const cityIcon = L.icon({
                    iconUrl: weatherIconUrl,
                    iconSize: [50, 50], // Adjusted size to 35x35
                    iconAnchor: [25, 50],
                    popupAnchor: [0, -20]
                });

                L.marker(cityLatLng, { icon: cityIcon }).addTo(map)
                    .bindPopup(popupContent);

                const htmlBody = createWeatherCardTopCity(nearbyCities, i);
                topCitiesweatherCardsDiv.insertAdjacentHTML("beforeend", htmlBody);
                // Add click event listener to each card
                const cardElement = topCitiesweatherCardsDiv.lastElementChild;
                cardElement.addEventListener('click', () => {
                    const cityName = cardElement.getAttribute('data-city');
                    displayWeatherCardCity(cityName);
                });
            }
        })
        .catch((error) => {
            // showToast("An error occurred while fetching nearby cities!");
            console.log(error.message)
        });
};







const createWeatherCard = (data, i,cityName, timeStamp) => {
    const formatDate = (inputDate) => {
        const options = { weekday: 'long', day: 'numeric' };
        return new Date(inputDate).toLocaleDateString(undefined, options);
    }
    const getWeatherDescription = (weatherCode) => {
        return weatherDescriptions[weatherCode] || "Unknown";
    };
  
   
    if(timeStamp === 'current') { // HTML for the main weather card
        try{

            
        const timeBeforeT = data.time.substring(0, data.time.indexOf('T'));
        const weatherDescription = getWeatherDescription(data.weather_code);
        const weatherIconUrl = `https://openweathermap.org/img/wn/0${getWeatherDescription(data.weather_code)}d@4x.png`;
        const defaultIconClass = 'fas fa-cloud fa-3x' // Font Awesome class for a cloud icon

        return `<div class="details">
                    <h2>${cityName} (Today)</h2>
                    <h6>Temperature: ${data.temperature_2m}°C</h6>
                    <h6>Wind-Speed: ${data.wind_speed_10m} km/h</h6>
                    <h6>Wind-Direction: ${data.wind_direction_10m}° </h6>
                  

                    <h6>Weather-Description: ${weatherDescription}</h6>

                </div>
                <div class="icon" style="margin-top: 10px; display: flex; align-items: center;">
                <img src="${weatherIconUrl}" onerror="this.onerror=null; this.src='';" class="${defaultIconClass}" >

                </div>`;
    }
    catch(error){
        console.error('Error fetching current weather data:', error);
            return ''; //
    }
                ;
    } else { // HTML for the other ten day forecast card
        const formattedDate = formatDate(data.time[i]);
        const weatherDescription = getWeatherDescription(data.weather_code[i]);

        return `<li class="card">
                    <h3>${formattedDate}</h3>
                    <h6>Temperature: ${data.temperature_2m_max[i]}°C</h6>
            
                    <h6>Wind-Speed: ${data.wind_speed_10m_max[i]} km/h</h6>
                    <h6>Wind-Direction: ${data.wind_direction_10m_dominant[i] }° </h6>
                      <h6>Weather-Description: ${weatherDescription}</h6>


                </li>`;
    }
}



// const createWeatherCard = (data, i, cityName, timeStamp) => {
//     const formatDate = (inputDate) => {
//         const options = { weekday: 'long', day: 'numeric' };
//         return new Date(inputDate).toLocaleDateString(undefined, options);
//     }
//     const getWeatherDescription = (weatherCode) => {
//         return weatherDescriptions[weatherCode] || "Unknown";
//     };

//     if (timeStamp === 'current') {
//         const apiKey = "c5424ee0df0a0d2e878034dda38e13c8"; // Replace with your actual API key
//         const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

//         return new Promise((resolve, reject) => {
//             fetch(apiUrl)
//                 .then(response => response.json())
//                 .then(weatherData => {
//                     const weatherDescription = getWeatherDescription(weatherData.weather[0].id);
//                     const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

//                     const html = `<div class="details">
//                                     <h2>${cityName} (Today)</h2>
//                                     <h6>Temperature: ${weatherData.main.temp}°C</h6>
//                                     <h6>Wind-Speed: ${weatherData.wind.speed} km/h</h6>
//                                     <h6>Wind-Direction: ${weatherData.wind.deg}°</h6>
//                                     <h6>Weather-Description: ${weatherDescription}</h6>
//                                 </div>
//                                 <div class="icon" style="margin-top: 10px; display: flex; align-items: center;">
//                                     <img src="${weatherIconUrl}" alt="Weather Icon">
//                                 </div>`;
//                     resolve(html);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching current weather data:', error);
//                     resolve(''); // Return an empty string if there's an error fetching data
//                 });
//         });
//     } else {
//         // Your existing code for the other ten day forecast card
//         const formattedDate = formatDate(data.time[i]);
//                 const weatherDescription = getWeatherDescription(data.weather_code[i]);
        
//                 return `<li class="card">
//                             <h3>${formattedDate}</h3>
//                             <h6>Temperature: ${data.temperature_2m_max[i]}°C</h6>
                    
//                             <h6>Wind-Speed: ${data.wind_speed_10m_max[i]} km/h</h6>
//                             <h6>Wind-Direction: ${data.wind_direction_10m_dominant[i] }° </h6>
//                               <h6>Weather-Description: ${weatherDescription}</h6>
        
        
//                         </li>`;
//     }
// }





// const getWeatherDetails = (cityName, latitude, longitude) => {
//     const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code,rain,showers,wind_direction_10m&forecast_days=11&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_speed_10m_min,weather_code,precipitation_sum,wind_direction_10m_dominant`;

//     let timeout = setTimeout(() => {
       
//         const errorDiv = document.getElementById("error");
//               errorDiv.style.display = "none";
//         showToast("Failed to load weather forecast. Please try again later.");
//     }, 60000); // 1 minute timeout

//     fetch(WEATHER_API_URL)
//         .then(response => response.json())
//         .then(data => {
//              clearTimeout(timeout); // Clear the timeout since response is received

//             console.log(data,"open-metoa")

//             // Clearing previous weather data
//             cityInput.value = "";
//              currentWeatherDiv.innerHTML = "";
//             weatherCardsDiv.innerHTML = "";

//             const htmlHeader = createWeatherCard(data.current, -1, cityName, 'current');
            
//             currentWeatherDiv.insertAdjacentHTML("beforeend", htmlHeader);

//             for(let i=1; i < 11; i++){
//                 const htmlBody = createWeatherCard(data.daily, i, cityName, 'forecast');
//                 weatherCardsDiv.insertAdjacentHTML("beforeend", htmlBody);
//             }
//         })
//         .catch((error) => {
//          console.log(error.message)
//             showToast("An error occurred while fetching the weather forecast!");
//             currentWeatherDiv.style.display ="none";
//             weatherCardsDiv.style.display = "none"
//         });
// }


const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code,rain,showers,wind_direction_10m&forecast_days=11&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_speed_10m_min,weather_code,precipitation_sum,wind_direction_10m_dominant`;

    // Set a timeout of 1 minute (60000 milliseconds)
    let timeout = setTimeout(() => {
        const errorDiv = document.getElementById("error");
        errorDiv.style.display = "none";
        const h3Element = document.querySelector('h3');
                h3Element.style.display="block";
                
        showToast("Failed to load weather forecast. Please try again later.");
    }, 7000); // 1 minute timeout

    // Make the API request
    fetch(WEATHER_API_URL)
        .then(response => {
            // If response received within the timeout period, clear the timeout
            clearTimeout(timeout);

            // Parse JSON response
            return response.json();
        })
        .then(data => {
            // Log the received data
            console.log(data, "open-metoa");

            // Clearing previous weather data
            cityInput.value = "";
            currentWeatherDiv.innerHTML = "";
            weatherCardsDiv.innerHTML = "";

            // Create HTML elements for current weather and forecast cards
            const htmlHeader = createWeatherCard(data.current, -1, cityName, 'current');
            currentWeatherDiv.insertAdjacentHTML("beforeend", htmlHeader);

            for (let i = 1; i < 11; i++) {
                const htmlBody = createWeatherCard(data.daily, i, cityName, 'forecast');
                weatherCardsDiv.insertAdjacentHTML("beforeend", htmlBody);
            }
        })
        .catch((error) => {
            // Handle errors, such as network issues or invalid responses
            console.log(error.message);
            showToast("An error occurred while fetching the weather forecast!");
            currentWeatherDiv.style.display = "none";
            weatherCardsDiv.style.display = "none";
        });
}





const clearMapMarkers = (map) => {
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
};

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (!/^[a-zA-Z]+$/.test(cityName)) {
        showToast("Please enter a valid input");
        return;
    }


    showLoader(); // Show the loader if the page is still loading


    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    // Get entered city coordinates (latitude, longitude, and name) from the API response
    fetch(API_URL).then(response => response.json()).then(data => {
        setTimeout(() => {
            hideLoader(); // Hide the loader after 5 seconds
        }, 6000); // 5000 milliseconds = 5 seconds
        if (!data.length) return showToast(`Location  ${cityName} not Found`);
        const { lat, lon, name } = data[0];
       ;
      


        getWeatherDetails(name, lat, lon);

     updateMapWithNearbyPlaces(lat, lon,map);
        // Call the function to display weather and map


        // Update the map with nearby places using the obtained coordinates

        
    }).catch(() => {
        showToast("An error occurred while fetching the coordinates!");
    });
}

const createWeatherCardTopCity = (nearbyCities, i) => {
    
    return `<ul data-city="${nearbyCities.list[i].name}" class="card">
                <b>${nearbyCities.list[i].name}</b><br>
                Temperature: ${(nearbyCities.list[i].main.temp - 273.15).toFixed(2)}°C<br>
                Wind Speed: ${(nearbyCities.list[i].wind.speed * 3.6).toFixed(2)} km/h<br>
                Wind Direction: ${nearbyCities.list[i].wind.deg}°<br>
                Weather Description: ${nearbyCities.list[i].weather[0].description}<br>
            </ul>`;
}

const getTopCityCoordinates = async (city) => {
    try {
        const apiKey = 'c5424ee0df0a0d2e878034dda38e13c8';
        const geocodingResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
        const geocodingData = await geocodingResponse.json();
        console.log("geoooooooo",geocodingData)

        // Extract latitude and longitude from the geocoding response
        const latitude = geocodingData[0]?.lat;
        const longitude = geocodingData[0]?.lon;
        // console.log(latitude,"hiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        // console.log(longitude)

        if (latitude && longitude) {
            return { latitude, longitude };

        } else {
            throw new Error(`Coordinates not found for ${city}`);
        }
    } catch (error) {
        console.error(`Error fetching coordinates for ${city}:`, error);
        throw error;
    }
}




async function fetchAndDisplayTopCityExtendedForecast(city, latitude, longitude) {



    try {
        const forecastResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,wind_direction_10m,weather_code&forecast_days=11&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_speed_10m_min,wind_direction_10m_dominant,weather_code`);
        
    

        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();

            // Clear previous weather data
            currentWeatherDiv.innerHTML = "";
            weatherCardsDiv.innerHTML = "";

            const htmlHeader = createWeatherCard(forecastData.current, -1, city, 'current');
            currentWeatherDiv.insertAdjacentHTML("beforeend", htmlHeader);

            for (let i = 1; i < 11; i++) {
                const htmlBody = createWeatherCard(forecastData.daily, i, city, 'forecast');
                weatherCardsDiv.insertAdjacentHTML("beforeend", htmlBody);
            }
        } else {
            console.error('Failed to fetch data from the weather API.');
            currentWeatherDiv.innerHTML = "Failed to fetch data from the weather API.";
            weatherCardsDiv.innerHTML = "";
        }
    } catch (error) {
        console.error(`Error fetching 10-day forecast for ${city}:`, error);
        currentWeatherDiv.innerHTML = "Error fetching data. Please try again later.";
        weatherCardsDiv.innerHTML = "";
    }
}





function displayWeatherCardCity(city) {

    // Call a function to fetch and display the 10-day forecast for the selected city
    getTopCityCoordinates(city)
        .then(({ latitude, longitude }) => fetchAndDisplayTopCityExtendedForecast(city, latitude, longitude))
        .catch(error => {
            console.error(`Error fetching coordinates for ${city}:`, error);
            showToast(`Weather forecast not available for ${city}!`);
        });
}

const updateMapWithNearbyPlaces = (latitude, longitude, map) => {
    // Fetch weather data for nearby places using the coordinates
    const numberOfCities = 10;
    clearMapMarkers(map); // Clear previous map markers

    const NEARBY_CITIES_API_URL = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=${numberOfCities}&appid=${API_KEY}`;

    fetch(NEARBY_CITIES_API_URL)
        .then(response => response.json())
        .then(nearbyCities => {
            

            console.log(nearbyCities);
            
            // Determine the zoom level based on the number of nearby places
            let zoomLevel;
            if (numberOfCities >= 10) {
                zoomLevel = 8;
            } else if (numberOfCities >= 5) {
                zoomLevel = 10;
            } else {
                zoomLevel = 12;
            }

            // Set the map view to the center coordinates with the determined zoom level
            map.setView([latitude, longitude], zoomLevel);

            // Loop through nearby cities and add markers to the map
            nearbyCities.list.forEach(city => {
                const cityLatLng = [city.coord.lat, city.coord.lon];

                const popupContent = `
                    <b>${city.name}</b><br>
                    Temperature: ${(city.main.temp - 273.15).toFixed(2)}°C<br>
                    Wind Speed: ${(city.wind.speed * 3.6).toFixed(2)} km/h<br>
                    Wind Direction: ${city.wind.deg}°<br>
                    Weather Description: ${city.weather[0].description}<br>
                `;

                
                const weatherIconUrl = `https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`;
                console.log(weatherIconUrl,"helooooo")

                const cityIcon = L.icon({
                    iconUrl: weatherIconUrl,
                    iconSize: [55, 55], // Adjusted size to 35x35
                    iconAnchor: [25, 50],
                    popupAnchor: [0, -20] 
                });

                L.marker(cityLatLng, { icon: cityIcon }).addTo(map)
                    .bindPopup(popupContent);
            });
            const topCitiesweatherCardsDiv = document.querySelector(".topCities-weather-cards");
            topCitiesweatherCardsDiv.innerHTML = "";

            for(let i=0; i < 10; i++){
                const htmlBody = createWeatherCardTopCity(nearbyCities, i);
                topCitiesweatherCardsDiv.insertAdjacentHTML("beforeend", htmlBody);

                // Add click event listener to each card
                const cardElement = topCitiesweatherCardsDiv.lastElementChild;
                cardElement.addEventListener('click', () => {
                    const cityName = cardElement.getAttribute('data-city');
                    displayWeatherCardCity(cityName);
                });
            }
        })
        .catch(error => {
            console.error("Error fetching nearby cities:", error);
            showToast("An error occurred while fetching nearby cities!");
        });
};







const showToast = (message) => {
    const toaster = document.getElementById('toaster');
    toaster.textContent = message;
    toaster.style.display = 'block';

    // Hide the toaster after 3 seconds (adjust as needed)
    setTimeout(() => {
        toaster.style.display = 'none';
    }, 3000);
}


const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords; // Get coordinates of user location
           showLoader()

            // Get city name from coordinates using reverse geocoding API
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL).then(response => response.json()).then(data => {
                setTimeout(() => {
                    hideLoader(); // Hide the loader after 5 seconds
                }, 6000); // 5000 milliseconds = 5 seconds
                const { name } = data[0];
                getWeatherDetails(name, latitude, longitude);
                updateMapWithNearbyPlaces(latitude, longitude,map);
               


            }).catch(() => {
                showToast("An error occurred while fetching the city name!");
            });
        },
        error => { // Show alert if user denied the location permission
            if (error.code === error.PERMISSION_DENIED) {
                showToast("Geolocation request denied. Please reset location permission to grant access again.");
            } else {
                showToast("Geolocation request error. Please reset location permission.");
            }
        });
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
        window.sessionStorage.removeItem("userName")

        // Redirect to the logout page or perform any other necessary actions
        window.location.href = "/";
      }
    });
  });



const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "overcast clouds",
    3: "Overcast",
    45: "Fog and depositing rime fog",
    48: "Fog and depositing rime fog",
    51: "Drizzle: Light intensity",
    53: "Drizzle: Moderate intensity",
    55: "Drizzle: Dense intensity",
    // ... (add more mappings as needed)
    99: "Thunderstorm with heavy hail",
    80:"Rain showers",
    95:"Thunderstorm",
    71:"Snow fall",
    73:"Snow fall",
    75:"Snow fall",
    61:"Rain"
};
locationButton.addEventListener("click", getUserCoordinates);


searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());