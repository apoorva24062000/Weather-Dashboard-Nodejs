document.addEventListener('DOMContentLoaded', async function () {
    try {
        const API_KEY = 'c5424ee0df0a0d2e878034dda38e13c8';
        const numberOfCities = 11; 

        // Get user's current location
        navigator.geolocation.getCurrentPosition(async function (position) {
            const currentCoordinates = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };
            console.log(currentCoordinates)

            // Fetch weather data for the top 8 cities near the current location
            const TOP_CITIES_API_URL = `https://api.openweathermap.org/data/2.5/find?lat=${currentCoordinates.lat}&lon=${currentCoordinates.lon}&cnt=${numberOfCities}&appid=${API_KEY}`;

            const response = await axios.get(TOP_CITIES_API_URL);
            const topCitiesWeather = response.data.list;

            // Display weather cards
            const topCitiesWeatherContainer = document.getElementById('topCitiesWeather');
            topCitiesWeather.forEach(city => {
                const card = createWeatherCard(city);
                topCitiesWeatherContainer.appendChild(card);
            });
        });
    } catch (error) {
        console.error('Error fetching top cities weather:', error);
    }
});

function createWeatherCard(city) {
    const card = document.createElement('li');
    card.classList.add('card');
    const windSpeedKmPerHour = (city.wind.speed * 3.6).toFixed(2);

    const content = `
        <h3>${city.name}</h3><br>
        <p>Temperature: ${(city.main.temp - 273.15).toFixed(2)}°C</p><br>
        <p>Wind Speed: ${windSpeedKmPerHour} Km/h</p><br>
       <p> Wind Direction : ${city.wind.deg}°</p><br>
       <p> Weather Description: ${city.weather[0].description}<p>


    `;

    card.innerHTML = content;
    return card;
}