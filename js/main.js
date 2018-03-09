"use strict";
console.log("main.js is here");

// REQUIRES
let $ = require('jquery'),
    login = require('./user'),
    renderNews = require('./renderNews'),
    renderWeather = require('./renderWeather'),
    userProfile = require('./userProfile'),
    user = require('./user'), 
    date = require('./dateToday'),
    addUser = require('./fbAddUser.js'),
    build = require('./buildFBObj'),
    books = require('./searchBooks'),
    fireConfig = require('./configure'),
    footer = require('./footerIcons');

//---------LOGIN-----------//
$("#login").click(function(){
    // console.log("user clicked login");
    login.googleLogIn()
    .then((result) => {
        console.log("UID result from login: ", result.user.uid);
        login.setUser(result.user.uid);
        $("#login").addClass("d-none");
        $("#userPic").removeClass("d-none").html(`<img src="${result.user.photoURL}" alt="${result.user.displayName} photo from Google" class="profPic rounded-circle">`);
        console.log("login complete!");
        sendToFirebase();
    });
});

/////////////-------SEND INFO TO FIREBASE--------//////////
function sendToFirebase(){
      let userBuild = build.buildUserObj();
      //need to add logic to not add to firebase if user is already in firebase by UID
      addUser.addUser(userBuild);
}


/////////////--------SAVE BUTTONS----------------//////////
$(document).on("click", ".book-hearts", function() {
    console.log("clicked save new book");
    console.log(event.target.id);
    var id = event.target.id;
    // let bookInput = $("#copyBook");
    // console.log("copied Book input", bookInput);
    // books.getBooks(bookInput)
    var bookObj = build.buildBookObj(id);
    sendBooksToFirebase(bookObj);
  });

  function sendBooksToFirebase(bookObj){
    return $.ajax({
        url: `${fireConfig.getFBsettings().databaseURL}/booksInfo.json`,
        type: 'POST',
        data: JSON.stringify(bookObj),
        dataType: 'json'
     });
  }
  

/////////////-------SECONDARY BOOK SEARCH---------/////////
var bookList;
$(document).on("click", "#bigBookSearchBtn", function innerBooks(){
    var bigBookInput = document.getElementById("bigBookSearch").value;
    // console.log("books submit button clicked with value: ", bookInput);
    books.getBooks(bigBookInput)
.then((bookReturn)=>{
    console.log("book return is passed into render DOM search results");
    var bookResults = [];
        var booksForList = [];
        bookResults = JSON.parse(bookReturn);
        booksForList = bookResults.docs;
        console.log("book search results parsed", booksForList);
        bookList = `<div id="readingQuote" class="sageBG">
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
        </div>
        <div style="padding: 1rem;">
    <h2>Top 10 Book Results for <span style="color: #C63D0F;">${bigBookInput}</span>:</h2><hr />`;
        for(let item in booksForList){
            bookList += `<div class="row">
            <div class="col-auto"><i class="far fa-heart book-hearts" style="text-decoration: none; color: #C63D0F; opacity: 0.7;"></i>
            </div>
            <div class="col-10">
                    <h3 style="color: #7E8F7C;">${booksForList[item].title}</h3>
                    <p>${booksForList[item].author_name} — <em>published (${booksForList[item].first_publish_year})</em></p>
                </div>
            </div>`;
        }
        bookList += `</div>`;
        // console.log("bookList: ", bookList);
        $("#primaryContainer").html(bookList);
    });
});

$(document).on("keyup", "#bigBookSearch", function innerBooks(e){
    if(e.which === 13){
    var bigBookInput = document.getElementById("bigBookSearch").value;
    // console.log("books submit button clicked with value: ", bookInput);
    books.getBooks(bigBookInput)
.then((bookReturn)=>{
    console.log("book return is passed into render DOM search results");
    var bookResults = [];
        var booksForList = [];
        bookResults = JSON.parse(bookReturn);
        booksForList = bookResults.docs;
        console.log("book search results parsed", booksForList);
        bookList = `<div id="readingQuote" class="sageBG">
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
        </div>
        <div style="padding: 1rem;">
    <h2>Top 10 Book Results for <span style="color: #C63D0F;">${bigBookInput}</span>:</h2><hr />`;
        for(let item in booksForList){
            bookList += `<div class="row">
            <div class="col-auto"><i class="far fa-heart book-hearts" style="text-decoration: none; color: #C63D0F; opacity: 0.7;"></i>
            </div>
            <div class="col-10">
                    <h3 style="color: #7E8F7C;">${booksForList[item].title}</h3>
                    <p>${booksForList[item].author_name} — <em>published (${booksForList[item].first_publish_year})</em></p>
                </div>
            </div>`;
        }
        bookList += `</div>`;
        // console.log("bookList: ", bookList);
        $("#primaryContainer").html(bookList);
    });
}
});

//////////--------FOOTER ICONS--------/////////
document.addEventListener('DOMContentLoaded', function () {
    $('#home-icon').on('click', function () {
      
    renderNews.showNews();
    renderNews.topImage();
    renderWeather.showWeather();
    date.showDate();
    books.searchBooks();
});
});


