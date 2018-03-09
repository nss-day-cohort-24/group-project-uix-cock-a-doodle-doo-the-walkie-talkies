"use strict";
console.log("renderWeather file is coming through");
let $ = require('../lib/node_modules/jquery'),
firebase = require("./configure"),
userData = require("./user"),
todayDate = require("./dateToday");


var showWeatherData = document.getElementById("weatherBlock");

//get weather information from API
function getWeather() {
    return $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?zip=37210,us&units=imperial&appid=f003b59e8e7d506d9b387f115f63483e`
    }).done((weatherData) => {
        return weatherData;
    });   
}

//add zipcode information to Firebase. Since this info need to be overwritten we use PUT and not POST. POST is for appending not overwriting. PATCH will overwrite only one key.
function addingZip(captureZip) {
    
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userInfo/-L75FYIvED1DNEb40InK.json`,
        type: 'PATCH',
        data: JSON.stringify(captureZip),
        dataType: 'json'
    }).done((zipData) => {
        return zipData;
    });
}

var currentWeather;
var weatherDetails;
var cityId = 4481519;

// showing weather on the DOM
function showWeather() {
        getWeather().then((weatherData) => {
        currentWeather = weatherData.main.temp.toFixed(0) + ' &#8457;' + `<br><br>` +  " Min " +
        weatherData.main.temp_min.toFixed(0) + " Max " + weatherData.main.temp_max.toFixed(0);
        weatherDetails = weatherData.weather[0].description + `<div id="zip-code"></div>`;// weather details like sunny, partly cloudy

        showWeatherData.innerHTML = `<h2>Today's Weather:</h2><p id="temp">${currentWeather}</p><p>${weatherDetails}</p>`;

        // addingWeatherFB(tacoWeather);
        // addWeatherFB(); 
        inputZipcode();
    });
}

// Add weather to FB
function addingWeatherFB(tacoWeather) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/currentWeather.json`,
        type: 'POST',
        data: JSON.stringify(tacoWeather),
        dataType: 'json'
    }).done((fbWeatherData) => {
        return fbWeatherData;
    });
}

let loadWeather = (currentWeather, weatherDetails) => {
    let tempLoad = {
        temp: currentWeather,
        detail: weatherDetails
    };
return tempLoad;
};


var detailLoad;
function addWeatherFB(){
    // getWeather().then((nashData) => {
    //     let wetObject = loadWeather(nashData.list[0].main.temp, nashData.list[0].weather[0].description);
    //     addingWeatherFB(wetObject);
    //     console.log("Whats in the addWeatherFb", wetObject);

    // });
}



// creating input field for html. 
// Add event listener to get zip information.

var userZip = document.getElementById("user-zip");
var captureUserZip;
var enterZip = document.getElementById("enterZip");

function inputZipcode(){

    enterZip.addEventListener("click", function() {
        getWeather().then((nashData) => {
            let wetObject = loadWeather(nashData.list[0].main.temp, nashData.list[0].weather[0].description);
            addingWeatherFB(wetObject);

        });
    
        var inputuserZip = userZip.value; // using zipcode value entered by user 
        // creating zip key in FB
        
        captureUserZip = {
            zipCode: inputuserZip
        }; 
        addingZip(captureUserZip).then((data) => {
        });
    });
}

showWeather();
inputZipcode();

module.exports = {
    showWeather,
    addingZip
};