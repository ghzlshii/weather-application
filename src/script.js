let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);
function showCity(event) {
  event.preventDefault;
  let searchInput = document.querySelector("#search-form-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;
}
