"use strict";

// REQUIRES
let $ = require('jquery'),
firebase = require("./configure"),
userData = require("./user");

// VARIABLES
var bookList = `<div id="readingQuote" class="sageBG">
<div class="quote">
    <h1 style="color: #FDF3E7;"><em>Not all readers are leaders, but all leaders are readers.</em></h1>
    <p style="text-align: right;">-President Harry S. Truman</p>
</div>
</div>
<div class="sageBG" style="padding-bottom: 1rem;">
    <h2>Find A New Favorite Book:</h2>
    <div class="input-group input-group-lg mb-3">
        <input id="bigBookSearch" type="text" class="form-control" placeholder ="Enter a title or author" aria-label="BookSearch" aria-describedby="inputGroup-sizing-lg"><div class="input-group-append">
        &nbsp;<button type="button" class="btn btnGrey btn-lg" id="bigBookSearchBtn">Search</button>
        </div>
        </div>
    </div>`;
    var booksForList = [];

// FUNCTIONS

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


// search clicks and keyups
function searchBooks(){
    renderHomeBooks(); 
    $("#bookSearchBtn").click(()=>{
        var bookInput = document.getElementById("bookSearch").value;
        // console.log("books submit button clicked with value: ", bookInput);
        getBooks(bookInput)
    .done((bookReturn)=>{
        // console.log("book return is passed into render DOM search results");
        $("#primaryContainer").html(bookList);
        });
    });
    $( "#bookSearch").keyup((e)=> {
        var code = e.which;
        if(code === 13){
        $("#bookSearchBtn").click();
        }
    });
}

//get Book information from API and build results list
function getBooks(bookInput) {
    return $.ajax({
        url: `http://openlibrary.org/search.json?q='${bookInput}'&limit=10`
    }).done((bookReturn) => {
        // console.log("Book search results", bookReturn);
        var bookResults = [];
        bookResults = JSON.parse(bookReturn);
        booksForList = bookResults.docs;
        // let key = booksForList.keys;
        console.log("book search results parsed", booksForList);
        bookList += `<div style="padding: 1rem;"><h2>Top 10 Book Results for <span id="copyBook;" style="color: #C63D0F;">${bookInput}</span>:</h2><hr />`;
        for(let item=0; item<booksForList.length; item++){
            bookList += `<div class="row">
            <div class="col-auto"><i id="${item}" class="far fa-heart book-hearts" style="text-decoration: none; color: #C63D0F; opacity: 0.7;"></i>
            </div>
            <div class="col-10">
                    <h3 style="color: #7E8F7C;">${booksForList[item].title}</h3>
                    <p>${booksForList[item].author_name} — <em>published (${booksForList[item].first_publish_year})</em></p>
                </div>
            </div>`;
        }
        bookList += `</div>`;
        // console.log("bookList: ", bookList);
        return bookList; 
    });
        // .then((bookReturn)=>{
        //      // console.log("show me anything");
        //     var bookResults = [];
        //     var booksForList = [];
        //     bookResults = JSON.parse(bookReturn);
        //     booksForList = bookResults.docs;
        //     for(let item=0; item<booksForList.length; item++){
        //     let bookObj = {
        //         title: booksForList[item].title,
        //         author: booksForList[item].author_name,
        //         first_publish_year: booksForList[item].first_publish_year,
        //         uid: userData.getUser()
        //     };
        //     console.log("booksObj: ", bookObj);
        //     return bookObj;  
        // }
        // });          
}

function returnBookList(){
    return booksForList;
}


$("#books-icon").click(() => {
    // console.log("book icon has been clicked");
    getBooks('');
    $("#primaryContainer").html(bookList);
  });



searchBooks();

module.exports = {
    searchBooks,
    getBooks,
    renderHomeBooks, 
    returnBookList
};