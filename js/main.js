"use strict";
console.log("main.js is here");

let $ = require('jquery'),
    renderDOM = require('./renderDOM'),
    login = require('./user');

$("#login").click(function(){
    console.log("user clicked login");
    login.googleLogIn()
    .then((result) => {
        console.log("UID result from login: ", result.user.uid);
        login.setUser(result.user.uid);
        console.log("login complete!");
    });
});


