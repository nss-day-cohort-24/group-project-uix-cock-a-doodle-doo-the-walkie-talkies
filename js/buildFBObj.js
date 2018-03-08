"use strict";

// REQUIRE
let user = require('./user.js'),
    date = require('./dateToday');

function buildUserObj(UID) {
    let userObj = {
    // email: .email,
    // fullName: .value,
    zipCode: "",
    uid: user.getUser()
  };
  return userObj;
}


module.exports = {buildUserObj};