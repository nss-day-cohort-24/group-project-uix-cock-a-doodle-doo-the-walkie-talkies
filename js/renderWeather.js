"use strict";
console.log("renderWeather file is coming through");
let $ = require('../lib/node_modules/jquery');


var showWeatherData = document.getElementById("weather");

function getWeather() {
    return $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?lat=36&lon=86`
    }).done((weatherData) => {
        console.log("show me weatherData: ", weatherData);
        return weatherData;
    });
}

// &apiKey=f003b59e8e7d506d9b387f115f63483e

var currentWeather;

function showWeather() {
getWeather().then((weatherData) => {
 currentWeather = weatherData.dt;
console.log("WeatherData", weatherData);

    });
}
showWeatherData.innerHTML = showWeather();



module.exports = {showWeather};