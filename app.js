let now = new Date();
let time = document.querySelector("#unit-time");
let Day = now.getDay();
let Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thu",
    "Friday",
    "Saturday"
];
let day = [Days[Day]];
let hour = now.getHours();
if (hour < 10) {
    hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
    minute = `0${minute}`;
}
time.innerHTML = `${day} ${hour}:${minute}`;

function showCity(event) {
    event.preventDefault();
    // let city = document.querySelector(".city");
    let city = document.querySelector("#city");
    let heading = document.querySelector("#cities");
    heading.innerHTML = `${city.value}`;
}
let inputCity = document.querySelector("form");
inputCity.addEventListener("submit", showCity);

function showWeather(response) {
    console.log(response.data);
    document.querySelector("#city").innerHTML = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let currentTemperature = document.querySelector("#temperature");
    currentTemperature.innerHTML = `${temperature}℃`;
    let wind = Math.round(response.data.wind.speed);
    let currentWindSpeed = document.querySelector("#windSpeed");
    currentWindSpeed.innerHTML = `Wind: ${wind} km/h`;
    let humidity = response.data.main.humidity;
    let currentHumidity = document.querySelector("#humidity");
    currentHumidity.innerHTML = `Humidity: ${humidity} %`;
    let heading = document.querySelector("#cities");
    heading.innerHTML = response.data.name;
}

function search(event) {
    event.preventDefault();
    let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
    let myCity = document.querySelector("#city").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function searchLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
