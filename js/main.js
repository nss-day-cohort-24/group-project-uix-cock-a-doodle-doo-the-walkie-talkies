"use strict";
console.log("main.js is here");

let $ = require('jquery'),
    login = require('./user'),
    renderNews = require('./renderNews'),
    renderWeather = require('./renderWeather'),
    userProfile = require('./userProfile');


$("#login").click(function(){
    console.log("user clicked login");
    login.googleLogIn()
    .then((result) => {
        console.log("UID result from login: ", result.user.uid);
        login.setUser(result.user.uid);
        $("#login").addClass("d-none");
        $("#userPic").removeClass("d-none");
        console.log("login complete!");
    });
});

$("#logout").click(() => {
    console.log("logout clicked");
    login.googleLogOut();
    $("#userPic").addClass("d-none");
    $("#login").removeClass("d-none");
    $("#logout").addClass("d-none");
    $("#secondaryLogin").removeClass("d-none");
  });

var currentDate = new Date();
var monthIndex = new Array([]);
    monthIndex[0] = "January";
    monthIndex[1] = "February";
    monthIndex[2] = "March";
    monthIndex[3] = "April";
    monthIndex[4] = "May";
    monthIndex[5] = "June";
    monthIndex[6] = "July";
    monthIndex[7] = "August";
    monthIndex[8] = "September";
    monthIndex[9] = "October";
    monthIndex[10] = "November";
    monthIndex[11] = "December";
    var date = currentDate.getDate();
var month = monthIndex[currentDate.getMonth()];
var year = currentDate.getFullYear();
var copyright = document.getElementById("showdate");
function showDate(){
    copyright.innerHTML = `${month}&nbsp;${date},&nbsp;${year}`;
}
showDate();
