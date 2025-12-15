import "./styles.css";

const API_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const DEFAULT_LOCATION = "Manila";
const API_KEY = "ST7FFH2WLRPHWLDYDJXPE3B48";

function displayWeather(data) {
  const today = data.days[0];

  document.getElementById("location").textContent = data.resolvedAddress;
  document.getElementById("temp").innerHTML = `${Math.round(
    today.temp
  )}<span id="temp-unit">°C</span>`;
  document.getElementById("condition").textContent = today.conditions;
  document.getElementById("rel-temp").textContent = `Feels Like: ${Math.round(
    today.feelslike
  )}°C`;
  document.getElementById("speed").textContent = `Windspeed: ${Math.round(
    today.windspeed
  )} km/h`;
  document.getElementById("humid").textContent = `Humidity: ${today.humidity}%`;
}

async function getWeather(location) {
  try {
    // Show loading indicator
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("weather-display").style.display = "none";

    const url = encodeURI(
      `${API_URL}/${location}?key=${API_KEY}&unitGroup=metric`
    );
    const res = await fetch(url);
    const data = await res.json();
    displayWeather(data);

    // Hide loading indicator
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("weather-display").style.display = "block";
  } catch (error) {
    console.error("Error fetching weather:", error);
    // Hide loading indicator even on error
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("weather-display").style.display = "block";
  }
}

getWeather(DEFAULT_LOCATION);

function performSearch() {
  const searchInput = document.getElementById("search");
  const location =
    searchInput.value &&
    searchInput.value
      .toLowerCase()
      .trim()
      .split()
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");

  if (location) {
    getWeather(location);
    searchInput.value = "";
  }
}

document.getElementById("search").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});

document.getElementById("search-btn").addEventListener("click", performSearch);
