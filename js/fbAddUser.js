"use strict";
console.log("fbAddUs has arrived");

//REQUIRES
let fireConfig = require("./configure"),
      $ = require('jquery'),
      build = require('./buildFBObj');

function addUser(userObj) {
	// console.log("add user to firebase", userObj);
	return $.ajax({
      url: `${fireConfig.getFBsettings().databaseURL}/userInfo.json`,
      type: 'POST',
      data: JSON.stringify(userObj),
      dataType: 'json'
   }).done((userID) => {
      return userID;
   });
}

module.exports = {addUser};