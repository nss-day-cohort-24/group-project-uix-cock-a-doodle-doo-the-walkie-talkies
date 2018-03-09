"use strict";

let $ = require('jquery'),
    login = require('./user'),
    renderNews = require('./renderNews'),
    renderWeather = require('./renderWeather'),
    userProfile = require('./userProfile'),
    user = require('./user'), 
    date = require('./dateToday'),
    addUser = require('./fbAddUser.js'),
    userObj = require('./buildFBObj'),
    books = require('./searchBooks');

var showNewsDataFunction = document.getElementById("news-data");
var topArticleImage;
var showTopNewsImage = document.getElementById("heroNews");
var bookList= "";

$("#home-icon").click(function(){location.reload();});

$("#news-icon").click(() => {
    console.log("news icon has been clicked");
    $("#primaryContainer").html(renderNews.showTop10());
  });

