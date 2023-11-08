function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");
  time.innerHTML = formatDate(date);
  icon.innerHTML = `<img
                  src="${response.data.condition.icon_url}"
                  class="weather-icon"
                />`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  description.innerHTML = response.data.condition.description;
  city.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "ba0743adf2fbfcf70fb57bao83btfb19";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "ba0743adf2fbfcf70fb57bao83btfb19";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast">
                <div class="weather-forecast-date">${formatDay(day.time)}</div>
                <div class="weather-forecast-icon">
                  <img
                    src="${day.condition.icon_url}"
                    width="50px"
                  />
                </div>
                <span class="weather-forecast-max"> ${Math.round(
                  day.temperature.maximum
                )}°</span
                ><span class="weather-forecast-min"> ${Math.round(
                  day.temperature.minimum
                )}°</span>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);
searchCity("tehran");
displayForecast();
