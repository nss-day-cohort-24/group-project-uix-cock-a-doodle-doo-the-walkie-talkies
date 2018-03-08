"use strict";
// console.log("renderDOM file is coming through");
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
let seeMore = document.getElementById("seeMoreNews");
        for(var i = 0; i < 3; i++){
            // console.log(i, newsArticles[i]);

             newsStories += `<li class="news-articles"><h3>${newsArticles[i].title}</h3></li>
             <li>${newsArticles[i].description}...<a href="${newsArticles[i].url}" alt="Link to ${newsArticles[i].title}">See full  article at ${newsArticles[i].source.name}</a> <a href="#" style="text-decoration: none; color: #C63D0F;"><i class="far fa-heart" id="favorites-heart"></i></a></li><br>`;

            // if(newsArticles.description){
            //     newsStories += `<li class="news-articles" style="font-size: 13px;"><strong>${newsArticles[i].title}</strong></li>
            //  <li style="font-size: 12px;">${newsArticles[i].description}...<a href="${newsArticles[i].url}" alt="Link to ${newsArticles[i].title}">See full  article at ${newsArticles[i].source.name}</a> <a href="#" style="text-decoration: none; color: #C63D0F;"><i class="far fa-heart" id="favorites-heart"></i></a></li><br>`;
            // }
        }
        $('#news-data').html(newsStories);
    });
}
showNewsDataFunction.innerHTML = showNews();



var topArticleImage;
var showTopNewsImage = document.getElementById("heroNews");

function topImage() {
    getNews().then((image) => {
        topArticleImage = image.articles;
        // console.log("top article images", topArticleImage);

        let showImage = "";
        for(var x = 0; x < 1; x++) {
            showImage += `<a href="${topArticleImage[0].url}" alt="Link to ${topArticleImage[0].title}" title="Link to ${topArticleImage[0].title}"><img width="100%" src="${topArticleImage[0].urlToImage}">`;
        }
        $('#heroNews').html(showImage);
    });
}
showTopNewsImage.innerHTML = topImage();



var newAllNews;
$("#viewAllNews").click(() => {
    // console.log("news data div has been clicked");
    //render the dom with the #primaryContainer as empty
    $('#primaryContainer').html("");
  });



module.exports = {getNews, topImage};