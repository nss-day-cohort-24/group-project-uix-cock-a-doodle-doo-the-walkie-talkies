"use strict";

// REQUIRE
let user = require('./user.js'),
    date = require('./dateToday'),
    books = require('./searchBooks'),
    $ = require('jquery');

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
        article_title: $(news).attr("id"),
        article_description: "",
        article_source: "",
        uid: user.getUser()
    };
    return newsObj;
}


module.exports = {buildUserObj, buildNewsObj};