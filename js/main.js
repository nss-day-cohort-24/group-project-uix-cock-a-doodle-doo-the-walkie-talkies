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
        console.log("login complete!");
    });
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
