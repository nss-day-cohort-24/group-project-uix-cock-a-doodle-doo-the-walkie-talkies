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

function buildBookObj(id){
     // console.log("show me anything");
    var booksForList = books.returnBookList();
    var uid = user.getUser();
    let bookObj = {
        title: booksForList[id].title,
        author: booksForList[id].author_name[0],
        first_publish_year: booksForList[id].first_publish_year,
        uid: uid.uid
    };
    console.log("booksObj: ", bookObj);
    return bookObj; 
}     

module.exports = {buildUserObj, buildNewsObj, buildBookObj};