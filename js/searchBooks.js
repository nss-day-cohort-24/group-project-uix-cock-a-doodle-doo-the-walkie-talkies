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

// building DOM for books search results
function showBooksResults() {
    getBooks().then((bookReturn) => {
    $("#primaryContainer").HTML = `<p>${currentWeather}</p><p>${weatherDetails}</p>`;

    console.log("What are the books results?", bookReturn);
});
}



module.exports = {
    showBooksResults,
    addingZip
};