"use strict";

console.log("USER PROFILE JS");
let fb = require('./user');

// logout button

function logoutButton() {
    console.log("log out button function");
}
logoutButton();

// saves / favorites

function saves() {
    console.log("saves function is showing up");
}
saves();

// delete and edit buttons
function deleteBtn() {
    console.log("delete button function");
}
deleteBtn();

function edit() {
    console.log("edit button function");
}
edit();


// user info
function userInfo() {
    console.log("user Info");
}
userInfo();


module.exports = {logoutButton, saves, deleteBtn, edit, userInfo};