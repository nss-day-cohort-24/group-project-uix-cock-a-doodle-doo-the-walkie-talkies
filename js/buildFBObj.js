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

function buildNewsObj(news) {
    let newsObj = {
        article_title: "",
        article_description: "",
        article_source: "",
        uid: user.getUser()
    };
    return newsObj;
}


module.exports = {buildUserObj, buildNewsObj};