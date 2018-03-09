"use strict";

// console.log("USER PROFILE JS");

let login = require('./user'),
build = require('./buildFBObj'),
addUser = require('./fbAddUser');
let firebase = require('firebase/app');
let $ = require('../lib/node_modules/jquery');
let config = require('./configure');


/* 
if the user clicks 'profile' button (id=userPic), the DOM will be rendered to show saved items

saved items will be in the div labeled "domContainer"
*/

let profile = document.getElementById("primaryContainer");

$('#userPic').click(() => {
    userProfile();
});

function userProfile() {
    $('#primaryContainer').html(`<button id="logout" type="button" class="btn btnRust btn-block">Logout</button>
    <button id="secondaryLogin" type="button" class="btn btnRust btn-block d-none">Login</button>
    <p>Saved User Lists will also render here</p>`);
}




function getNews(currentUser) {
    return $.ajax({
      url: `${config.getFBsettings().databaseURL}/userInfo.json?orderBy="uid"&equalTo="${currentUser}"`
    }).done((userNewsData) => {
      return userNewsData;
    });
  }


// delete and edit buttons
function deleteBtn(uid) {
    // console.log("delete button clicked");
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userInfo.json`,
        method: 'DELETE'
    }).done((db) => {
        // console.log("db", db);
        return db;
    });
}

function edit() {
    // console.log("edit button clicked");
}



///////////////LOGIN & LOGOUT BUTTON 
$(document).on("click", "#logout", ()=> {
    // console.log("logout clicked");
    login.googleLogOut();
    $("#userPic").addClass("d-none");
    $("#login").removeClass("d-none");
    $("#logout").addClass("d-none");
    $("#secondaryLogin").removeClass("d-none");
  });

  $(document).on("click", "#secondaryLogin", () =>{
    // console.log("user clicked login");
    login.googleLogIn()
    .then((result) => {
        console.log("UID result from login: ", result.user.uid);
        login.setUser(result.user.uid);
        $("#secondaryLogin").addClass("d-none");
        $("#login").addClass("d-none");
        $("#logout").removeClass("d-none");
        $("#userPic").removeClass("d-none").html(`<img src="${result.user.photoURL}" alt="${result.user.displayName} photo from Google" class="profPic rounded-circle">`);
        console.log("login complete!");
        sendToFirebase();
    });
});

function sendToFirebase(){
    let userBuild = build.buildUserObj();
    //need to add logic to not add to firebase if user is already in firebase by UID
    addUser.addUser(userBuild);
}

module.exports = {getNews, deleteBtn, edit};