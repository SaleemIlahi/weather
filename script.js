let city_name = "";

// Fetching lan and lon
let fetchlanlon = async () => {
  let response = await fetch("https://ipapi.co/json/");
  let data = await response.json();
  return data;
};

// Fetching Weather data
let fetchWeather = async (city) => {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e4f7cbf93edc85aa1ad13aa4d20f312e&units=metric`;
  let weatherRespomse = await fetch(url);
  let weatherData = await weatherRespomse.json();
  return weatherData;
};

// Fetching AQI data
let fetchAQI = async (lat, lon) => {
  urlAqi = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=e4f7cbf93edc85aa1ad13aa4d20f312e`;
  let aqiRespomse = await fetch(urlAqi);
  let aqiData = await aqiRespomse.json();
  return aqiData;
};

fetchlanlon().then((data) => {
  fetchWeather(data.city).then((el) => {
    document.getElementById("weather_city").innerHTML = el.name;
    document.getElementById("weather_decription").innerHTML =
      el.weather[0].description;
    document.getElementById(
      "weather_icon"
    ).src = `https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`;
    document.getElementById("temperature").innerHTML = Math.round(el.main.temp);

    fetchAQI(el.coord.lat, el.coord.lon).then((data) => {
      if (data.list[0].main.aqi == 1) {
        document.querySelector(".meter_indicator").style.transform =
          "rotate(-105deg)";
      } else if (data.list[0].main.aqi == 2) {
        document.querySelector(".meter_indicator").style.transform =
          "rotate(-52deg)";
      } else if (data.list[0].main.aqi == 3) {
        document.querySelector(".meter_indicator").style.transform =
          "rotate(0deg)";
      } else if (data.list[0].main.aqi == 4) {
        document.querySelector(".meter_indicator").style.transform =
          "rotate(52deg)";
      } else if (data.list[0].main.aqi == 5) {
        document.querySelector(".meter_indicator").style.transform =
          "rotate(105deg)";
      }
    });
  });
});
