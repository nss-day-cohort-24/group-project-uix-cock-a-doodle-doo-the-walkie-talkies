"use strict";
console.log("renderDOM file is coming through");
let $ = require('../lib/node_modules/jquery');


var showNewsDataFunction = document.getElementById("news-data");

function getNews() {
    return $.ajax({
        url: `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e453a2b70d6f424aa4afd355a6919f35`
    }).done((newsData) => {
        // console.log("show me newsData: ", newsData);
        return newsData;
    });
}

var newsArticles;

function showNews() {
getNews().then((newsData) =>{
 newsArticles = newsData.articles;
// console.log("newsData", newsData);

 // to get only 10 items to show:
 // check to see when i = 10, or break a loop when i is defined as 10
let newsStories = "";
        for(var i = 0; i < 10; i++){
            console.log(i, newsArticles[i]);

             newsStories += `<li class="news-articles"><a href="${newsArticles[i].url}" alt="Link to ${newsArticles[i].title}">${newsArticles[i].title}</a></li>`;
        }
        $('#news-data').html(newsStories);
    });
}
showNewsDataFunction.innerHTML = showNews();



module.exports = {getNews};