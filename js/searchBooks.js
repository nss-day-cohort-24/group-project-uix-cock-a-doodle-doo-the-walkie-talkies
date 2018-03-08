"use strict";

console.log("search books js is here");

"use strict";
let $ = require('jquery'),
firebase = require("./configure"),
userData = require("./user");


var bookInput = document.getElementById("bookSearch").val;
var bookResults = document.getElementById("bookResults");

//get weather information from API
function getBooks() {
    return $.ajax({
        url: `http://openlibrary.org/search.json?q='${bookInput}`
    }).done((bookReturn) => {
        console.log("Book search results", bookReturn);
        return bookReturn;
    });
}

// showing books on the DOM
function showBooks() {
    getBooks().then((bookReturn) => {

    $("#primaryContainer").innerHTML = `<p>${currentWeather}</p><p>${weatherDetails}</p>`;

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
            zipCode: inputuserZip
        }; 
    });
}

module.exports = {
    showWeather,
    addingZip
};