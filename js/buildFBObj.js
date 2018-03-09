"use strict";

// REQUIRE
let user = require('./user.js'),
    date = require('./dateToday'),
    books = require('./searchBooks'),
    news = require('./renderNews'),
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

function buildNewsObj(save) {
    var newsSaveObj = news.getArticle();
    var userID = user.getUser();
    let newsObj = {
        article_title: newsSaveObj[save].title,
        article_description: newsSaveObj[save].description,
        article_source: newsSaveObj[save].source.name,
        uid: userID.uid
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