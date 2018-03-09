"use strict";

console.log("search books js is here");

let $ = require('jquery'),
firebase = require("./configure"),
userData = require("./user");


// render homeBooks to dom
function renderHomeBooks() {
    $("#homeBooks").html(`<h2>Find A New Favorite Book:</h2>
    <div class="input-group input-group-sm mb-3">
  <input id="bookSearch" type="text" class="form-control" placeholder ="Enter a title or author" aria-label="BookSearch" aria-describedby="inputGroup-sizing-sm"><div class="input-group-append">
  &nbsp;<button type="button" class="btn btnGrey" id="bookSearchBtn">Search</button>
</div>
</div>`);
    $("#homeMeetups").html(`<h2 style="color: #FDF3E7">Find a Local Meetup:</h2><p><em>Meetup Information coming in Dashbot v2</em></p>`);
}

function searchBooks(){
    renderHomeBooks();
        $("#bookSearchBtn").click(()=>{
            var bookInput = document.getElementById("bookSearch").value;
            console.log("books submit button clicked with value: ", bookInput);
        getBooks(bookInput)
    .done((bookReturn)=>{
        console.log("book return is passed into render DOM search results");
        $("#primaryContainer").html(bookList);
        });
        });
}

//get Book information from API
var bookList;
function getBooks(bookInput) {
    return $.ajax({
        url: `http://openlibrary.org/search.json?q='${bookInput}'&limit=10`
    }).done((bookReturn) => {
        console.log("Book search results", bookReturn);
        var bookResults = [];
        var booksForList = [];
        bookResults = JSON.parse(bookReturn);
        booksForList = bookResults.docs;
        console.log("book search results parsed", booksForList);
        bookList = `<h2>Top 10 Book Results for <span style="color: #C63D0F;">${bookInput}</span>:</h2><hr />`;
        for(let item in booksForList){
            bookList += `<div><h3 style="color: #7E8F7C;">${booksForList[item].title}</h3><p>${booksForList[item].author_name} — <em>published (${booksForList[item].first_publish_year})</em></p></div>`;
        }
        console.log("bookList: ", bookList);
        return bookReturn;
    });
}



// // building DOM for books search results
// function showBooksResults() {
//     getBooks().then((bookReturn) => {
//     $("#primaryContainer").HTML = `<p>${currentWeather}</p><p>${weatherDetails}</p>`;

//     console.log("What are the books results?", bookReturn);
// });
// }

searchBooks();

module.exports = {
    searchBooks
};