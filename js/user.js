"use strict";

// REQUIRES
let fireConfig = require("./configure"),
	currentUser = null,
	$ = require('jquery');

var firebase = require("firebase/app");
    require("firebase/auth");
	require("firebase/database");

var provider = new firebase.auth.GoogleAuthProvider();

// FUNCTIONS
function googleLogIn() {
    return firebase.auth().signInWithPopup(provider);
}

function googleLogOut(){
    return firebase.auth().signOut();
}

function setUser(val){
	currentUser = val;
}

function getUser(){
    return currentUser;
}

firebase.auth().onAuthStateChanged(function(user){
	console.log("onAuthStateChanged", user);
	if (user){
		currentUser = user.uid;
		console.log("This user is logged in:", currentUser);
	}else{
		currentUser = null;
		console.log("User is not logged in");
	}
});

module.exports = {googleLogIn, googleLogOut, setUser, getUser};
