let now = new Date();

let h3 = document.querySelector("h3");

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
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

function search(city) {
  let apiKey = "3ba204fa15dbbaba90617ba765f650d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

h3.innerHTML = `${day}, ${hour}:${minutes}`;

function showWeather(response) {
  console.log(response);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(
    response.data.main.feels_like * (9 / 5) + 32
  );
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp * (9 / 5) + 32
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max * (9 / 5) + 32
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min * (9 / 5) + 32
  );
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "images",
    `images/icons/${response.data.weather[0].icon}.png`
  );
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  search(city);
}
function searchLocation(position) {
  let apiKey = "3ba204fa15dbbaba90617ba765f650d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

search("Los Angeles");
