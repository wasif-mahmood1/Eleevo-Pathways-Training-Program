const apiKey = "4eb3703790b356562054106543b748b2"; // OpenWeatherMap API key
const cityInput = document.getElementById("city-input");
const suggestionsBox = document.getElementById("suggestions");
const weatherDiv = document.getElementById("weather");
const loadingDiv = document.getElementById("loading");

// Fetch city suggestions
cityInput.addEventListener("input", async () => {
    const query = cityInput.value.trim();
    if (query.length < 2) {
        suggestionsBox.style.display = "none";
        return;
    }
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`);
    const cities = await res.json();
    suggestionsBox.innerHTML = "";
    if (cities.length > 0) {
        cities.forEach(city => {
            const div = document.createElement("div");
            div.textContent = `${city.name}, ${city.country}`;
            div.onclick = () => {
                cityInput.value = `${city.name}, ${city.country}`;
                suggestionsBox.style.display = "none";
                fetchWeather(city.lat, city.lon);
            };
            suggestionsBox.appendChild(div);
        });
        suggestionsBox.style.display = "block";
    } else {
        suggestionsBox.style.display = "none";
    }
});

// Fetch weather by coordinates
async function fetchWeather(lat, lon) {
    loadingDiv.style.display = "block";
    weatherDiv.innerHTML = "";
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const data = await res.json();
    loadingDiv.style.display = "none";

    if (data.cod !== "200") {
        weatherDiv.innerHTML = `<p>Weather data not found.</p>`;
        return;
    }

    const current = data.list[0];
    weatherDiv.innerHTML = `
        <h2>${data.city.name}, ${data.city.country}</h2>
        <img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" alt="${current.weather[0].description}">
        <p><strong>${current.main.temp}°C</strong> - ${current.weather[0].description}</p>
        <div class="forecast">
            ${data.list.slice(0, 24).filter((_, i) => i % 8 === 0).map(day => `
                <div class="forecast-day">
                    <p>${new Date(day.dt_txt).toLocaleDateString()}</p>
                    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="">
                    <p>${day.main.temp}°C</p>
                </div>
            `).join("")}
        </div>
    `;
}

// Get current location weather
document.getElementById("current-location-btn").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(pos => {
        fetchWeather(pos.coords.latitude, pos.coords.longitude);
    });
});
