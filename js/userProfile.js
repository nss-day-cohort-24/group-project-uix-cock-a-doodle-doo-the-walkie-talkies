"use strict";

console.log("USER PROFILE JS");
let fb = require('./user'),
firebase = require('firebase/app');
let $ = require('../lib/node_modules/jquery');
let config = require('./configure');


/* 
if the user clicks 'profile' button (id=userPic), the DOM will be rendered to show saved items

saved items will be in the div labeled "domContainer"
*/



// logout button

function logoutButton() {
    console.log("log out button function");
}
logoutButton();




function getNews(currentUser) {
    return $.ajax({
      url: `${config.getFBsettings().databaseURL}/news-article.json?orderBy="uid"&equalTo="${currentUser}"`
    }).done((userNewsData) => {
      return userNewsData;
    });
  }

// saves / favorites
function saves() {
    console.log("saves function is showing up");

}
saves();

// delete and edit buttons
$(document).on("click", ".delete-btn", function deleteBtn(deleteButton) {
    console.log("delete button function");
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/news-articles.json"`,
        type: 'DELETE',
        data: JSON.stringify(deleteButton),
        dataType: 'json'
    }).done((db) => {
        console.log("db", db);
        return db;
    });
});

function edit() {
    console.log("edit button function");
}
edit();





module.exports = {logoutButton, saves, edit};