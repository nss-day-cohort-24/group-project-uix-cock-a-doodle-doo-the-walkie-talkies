"use strict";

console.log("search books js is here");

let $ = require('jquery'),
firebase = require("./configure"),
userData = require("./user");


// var bookInput = document.getElementById("bookSearch").val;
// var bookResults = document.getElementById("bookResults");

//get weather information from API
// function getBooks() {
//     return $.ajax({
//         url: `http://openlibrary.org/search.json?q='${bookInput}`
//     }).done((bookReturn) => {
//         console.log("Book search results", bookReturn);
//         return bookReturn;
//     });
// }

// render homeBooks to dom
function renderHomeBooks() {
    $("#homeBooks").html(`<h2>Find A New Favorite Book:</h2>
    <div class="input-group input-group-sm mb-3">
  <input type="text" class="form-control" placeholder ="Enter a title or author" aria-label="BookSearch" aria-describedby="inputGroup-sizing-sm"><div class="input-group-append">
  &nbsp;<button type="button" class="btn btnGrey" id="bookInputSearch">Search</button>
</div>
</div>`);
    $("#homeMeetups").html(`<h2 style="color: #FDF3E7">Find a Local Meetup:</h2><p><em>Meetup Information coming in Dashbot v2</em></p>`);
}

// // building DOM for books search results
// function showBooksResults() {
//     getBooks().then((bookReturn) => {
//     $("#primaryContainer").HTML = `<p>${currentWeather}</p><p>${weatherDetails}</p>`;

//     console.log("What are the books results?", bookReturn);
// });
// }
renderHomeBooks();


module.exports = {
    renderHomeBooks
};