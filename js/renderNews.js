"use strict";
console.log("renderDOM file is coming through");
let $ = require('../lib/node_modules/jquery');


var showNewsDataFunction = document.getElementById("news-data");
var showTopNewsImage = document.getElementById("heroNews");

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
let seeMore = document.getElementById("seeMoreNews");
        for(var i = 0; i < 3; i++){
            // console.log(i, newsArticles[i]);
             newsStories += `<li class="news-articles" style="font-size: 13px;"><strong>${newsArticles[i].title}</strong></li>
             <li style="font-size: 12px;">${newsArticles[i].description}...<a href="${newsArticles[i].url}" alt="Link to ${newsArticles[i].title}">See full  article at ${newsArticles[i].source.name}</a> <a href="#" style="text-decoration: none; color: #C63D0F;"><i class="far fa-heart" id="favorites-heart"></i></a></li><br>`;

            // if(newsArticles.description){
            //     newsStories += `<li class="news-articles" style="font-size: 13px;"><strong>${newsArticles[i].title}</strong></li>
            //  <li style="font-size: 12px;">${newsArticles[i].description}...<a href="${newsArticles[i].url}" alt="Link to ${newsArticles[i].title}">See full  article at ${newsArticles[i].source.name}</a> <a href="#" style="text-decoration: none; color: #C63D0F;"><i class="far fa-heart" id="favorites-heart"></i></a></li><br>`;
            // }
        }
        $('#news-data').html(newsStories);
    });
}
showNewsDataFunction.innerHTML = showNews();



module.exports = {getNews};