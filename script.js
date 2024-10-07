const apiKey = "e242cf07b0fde73815915a3740eb2730";

const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");
const cityInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather img");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const suggestionsBox = document.querySelector(".suggestions");

const cities = ["Islamabad", "New York", "London", "Tokyo", "Sydney", "Paris", "Moscow", "Cairo", "Peshawar, PK"];
const gradients = [
    "linear-gradient(135deg, #ff7e5f, #feb47b)", // Sunset Vibes
    "linear-gradient(135deg, #4facfe, #00f2fe)", // Ocean Depths
    "linear-gradient(135deg, #ff6a88, #ff8a00)", // Peachy Dream
    "linear-gradient(135deg, #a8e063, #56ab2f)", // Fresh Mint
    "linear-gradient(135deg, #00c6ff, #0072ff)", // Twilight Blue
    "linear-gradient(135deg, #ff4e50, #fc913a)", // Coral Crush
    "linear-gradient(135deg, #6a11cb, #2575fc)", // Lavender Fields
    "linear-gradient(135deg, #2bc0e4, #eaecc6)", // Cool Breeze
    "linear-gradient(135deg, #fce38a, #f38181)", // Golden Hour
    "linear-gradient(135deg, #1d976c, #93f9b9)", // Lush Greenery
    "linear-gradient(135deg, #00feba, #5b548a)"  // Original Gradient
];

let currentIndex = 0;

function changeGradient() {
    const card = document.querySelector('.card');
    const randomIndex = Math.floor(Math.random() * gradients.length);
    card.style.background = gradients[randomIndex];
}

setInterval(changeGradient, 60000);
changeGradient();

async function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    
    console.log(apiUrl);
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        showError();
        console.log(error);
    }
}

function updateWeatherInfo(data) {
    cityElement.textContent = data.name;
    tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    humidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${data.wind.speed} km/h`;
    
    weatherIcon.src = `./images/${data.weather[0].main.toLowerCase()}.png`;
    weatherContainer.style.display = "block";
    errorContainer.style.display = "none";
}

function showError() {
    errorContainer.style.display = "block";
    weatherContainer.style.display = "none";
}



searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
    cityInput.value = "";
});

cityInput.addEventListener('change', ()=>{
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
    cityInput.value = "";
})

const getRandomCity = () => cities[Math.floor(Math.random() * cities.length)];
window.addEventListener('load', () => {
    fetchWeather(getRandomCity());
});
