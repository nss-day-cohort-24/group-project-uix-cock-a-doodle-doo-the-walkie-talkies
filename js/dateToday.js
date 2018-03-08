"use strict";

var currentDate = new Date();
var monthIndex = new Array([]);
    monthIndex[0] = "January";
    monthIndex[1] = "February";
    monthIndex[2] = "March";
    monthIndex[3] = "April";
    monthIndex[4] = "May";
    monthIndex[5] = "June";
    monthIndex[6] = "July";
    monthIndex[7] = "August";
    monthIndex[8] = "September";
    monthIndex[9] = "October";
    monthIndex[10] = "November";
    monthIndex[11] = "December";
    var dateDay = currentDate.getDate();
var month = monthIndex[currentDate.getMonth()];
var year = currentDate.getFullYear();
var date = document.getElementById("showdate");
function showDate(){
    date.innerHTML = `${month}&nbsp;${dateDay},&nbsp;${year}`;
}
showDate();

module.exports = {showDate};
