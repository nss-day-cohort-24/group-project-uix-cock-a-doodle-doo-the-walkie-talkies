"use strict";

console.log("USER PROFILE JS");

let login = require('./user'),
firebase = require('firebase/app');
let $ = require('../lib/node_modules/jquery');
let config = require('./configure');


/* 
if the user clicks 'profile' button (id=userPic), the DOM will be rendered to show saved items

saved items will be in the div labeled "domContainer"
*/

// var savedProfile;
// $("#userPic").click(() => {
//     console.log("profile image clicked");
//     //render the dom with the #primaryContainer as empty
//     $('#primaryContainer')
//   });


function getNews(currentUser) {
    return $.ajax({
      url: `${config.getFBsettings().databaseURL}/userInfo.json?orderBy="uid"&equalTo="${currentUser}"`
    }).done((userNewsData) => {
      return userNewsData;
    });
  }

// saves / favorites
function saves() {
    console.log("saves function clicked");
}

// delete and edit buttons
function deleteBtn(uid) {
    console.log("delete button clicked");
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userInfo.json`,
        method: 'DELETE'
    }).done((db) => {
        console.log("db", db);
        return db;
    });
}

function edit() {
    console.log("edit button clicked");
}



///////////////LOGOUT BUTTON 
$("#logout").click(() => {
    console.log("logout clicked");
    login.googleLogOut();
    $("#userPic").addClass("d-none");
    $("#login").removeClass("d-none");
    $("#logout").addClass("d-none");
    $("#secondaryLogin").removeClass("d-none");
  });

module.exports = {getNews, saves, deleteBtn, edit};