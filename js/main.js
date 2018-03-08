"use strict";
console.log("main.js is here");

let $ = require('jquery'),
    login = require('./user'),
    renderNews = require('./renderNews'),
    renderWeather = require('./renderWeather'),
    userProfile = require('./userProfile'),
    user = require('./user'), 
    date = require('./dateToday'),
    addUser = require('./fbAddUser.js'),
    userObj = require('./buildFBObj');


$("#login").click(function(){
    console.log("user clicked login");
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

$("#logout").click(() => {
    console.log("logout clicked");
    login.googleLogOut();
    $("#userPic").addClass("d-none");
    $("#login").removeClass("d-none");
    $("#logout").addClass("d-none");
    $("#secondaryLogin").removeClass("d-none");
  });


function sendToFirebase(){
      let userBuild = userObj.buildUserObj();
      addUser.addUser(userBuild);
}

  
function loadInfoToDOM() {
    console.log("Need to load some info");
    let currentUser = login.getUser();
    userProfile.getNews(currentUser).then((newsData) => {

        var hero = document.getElementById("heroNews");

        console.log("i got songs buddy", newsData);
        // var idArray = Object.keys(songData);
        // idArray.forEach((key) => {
        //   songData[key].id = key;
        // });
        hero.innerHTML = newsData;
      });
  }
  loadInfoToDOM();



