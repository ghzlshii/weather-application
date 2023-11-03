function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apiKey = "ba0743adf2fbfcf70fb57bao83btfb19";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);
function showCity(event) {
  event.preventDefault;
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

searchCity("tehran");
