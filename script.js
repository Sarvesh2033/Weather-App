const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-bar');
const locationElement = document.querySelector('.location');
const temperatureElement = document.querySelector('.temperature');
const weatherElement = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon');

const api = {
    key: "faf9837fe2162ce3b30fd8e414c0c9cd",
    base: "https://api.openweathermap.org/data/2.5/"
}

searchButton.addEventListener('click', function() {
    getWeather(searchInput.value);
});

function getWeather(city) {
    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            if (error.message === 'City not found') {
                alert("City not found! Please try again.");
            } else {
                console.error('Error:', error);
            }
        });
}

function displayWeather(data) {
    locationElement.innerText = `${data.name}, ${data.sys.country}`;
    temperatureElement.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
    weatherElement.innerText = data.weather[0].main;
    weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
}
