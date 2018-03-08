"use strict";
console.log("renderWeather file is coming through");
let $ = require('../lib/node_modules/jquery'),
firebase = require("./configure"),
userData = require("./user");



var showWeatherData = document.getElementById("weather");

//get weather information from API
function getWeather() {
    return $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?zip=37211,us&units=imperial&appid=f003b59e8e7d506d9b387f115f63483e`
    }).done((weatherData) => {
        console.log("show me weatherData: ", weatherData);
        return weatherData;
    });
}

//add zipcode information to Firebase. Since this info need to be overwritten we use PUT and not POST. POST is for appending not overwriting.
function addingZip(captureZip) {
    console.log("what's in captureZip inside addingZip ", captureZip);
    let test = `${firebase.getFBsettings().databaseURL}/userInfo/-L71KA9vAHe-eK6W5T7a.json`;
    console.log("url", test);
    
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userInfo/-L71KA9vAHe-eK6W5T7a.json`,
        type: 'POST',
        data: JSON.stringify(captureZip),
        dataType: 'json'
    }).done((zipData) => {
        console.log("show me zipData: ", zipData);
        return zipData;
    });
}

// &apiKey=f003b59e8e7d506d9b387f115f63483e

// Get weather 
function addWeather() {

}


var currentWeather;
var weatherDetails;

// showing weather on the DOM
function showWeather() {
    getWeather().then((weatherData) => {
    currentWeather = weatherData.main.temp.toFixed(0) + ' &#8457;';
    weatherDetails = weatherData.weather[0].icon + " " + weatherData.weather[0].description + `<div id="zip-code"></div>`;// weather details like sunny, partly cloudy

    console.log("WeatherData", weatherData);
    console.log("weather Details", weatherDetails);

    showWeatherData.innerHTML = `<p>${currentWeather}</p><p>${weatherDetails}</p>`;

    inputZipcode();
    console.log("What's showweatherData showing", showWeatherData);
});
}

showWeather();


// creating input field for html. 
// Add event listener to get zip information.

var userZip = 0;

function inputZipcode(){
    var zipInputfield = document.getElementById("zip-code");

    console.log("What is in zipInputfield ", zipInputfield);

    zipInputfield.innerHTML = `<input type="text" name="zipcode" id="user-zip"><button id="enterZip" type="submit">SEND</button>`;

    userZip = document.getElementById("user-zip");
    var enterZip = document.getElementById("enterZip");

    enterZip.addEventListener("click", function() {
        var inputuserZip = userZip.value;
        
        console.log("What's in inputuserZip ", inputuserZip);
        var captureZip = {
            zip: inputuserZip
        }; 
            console.log("What's in inputUserZip inside captureZip ", captureZip);
    });
}

module.exports = {
    showWeather,
    addingZip
};