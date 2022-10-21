let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hour = now.getHours();
let min = now.getMinutes();

let dt = document.querySelector("#current-time");
dt.innerHTML = `${day} ${hour} : ${min}`;

let form = document.querySelector("form");
form.addEventListener("submit", searchForCity);

function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temper = document.querySelector("#temperature");
  temper.innerHTML = `${temperature}`;
}

function searchForCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let searchingCity = city.value;
  let typedCity = document.querySelector("#location");
  typedCity.innerHTML = `📍 ${searchingCity}`;
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchingCity}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function showWeatherLocation(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  alert(`Temperature in your location is ${temperature} °C`);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeatherLocation);
}

navigator.geolocation.getCurrentPosition(handlePosition);

let element = document.querySelector("#whereAmI");
element.addEventListener("click", handlePosition);
