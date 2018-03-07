"use strict";
console.log("main.js is here");

let $ = require('jquery'),
    login = require('./user'),
    renderNews = require('./renderNews'),
    renderWeather = require('./renderWeather');


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


// var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth()+1; //January is 0!

// var yyyy = today.getFullYear();
// if(dd<10){
//     dd='0'+dd;
// } 
// if(mm<10){
//     mm='0'+mm;
// } 
//  today = dd+'/'+mm+'/'+yyyy;
// document.getElementById("date").value = today;
