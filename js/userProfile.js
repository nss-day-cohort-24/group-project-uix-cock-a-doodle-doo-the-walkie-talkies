"use strict";

console.log("USER PROFILE JS");

let fb = require('./user'),
firebase = require('firebase/app');
let $ = require('../lib/node_modules/jquery');
let config = require('./configure');


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





module.exports = {getNews, saves, deleteBtn, edit};