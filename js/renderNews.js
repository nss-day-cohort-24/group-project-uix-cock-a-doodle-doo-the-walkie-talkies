"use strict";
// console.log("renderDOM file is coming through");
let $ = require('../lib/node_modules/jquery');
let profile = require('./userProfile');
let fireConfig = require("./configure"),
      build = require('./buildFBObj');


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
var newsArray = [];
var newsStories = "";

function showNews() {
getNews().then((newsData) =>{
 newsArticles = newsData.articles;
// console.log("newsData", newsData);

 // to get only 10 items to show:
 // check to see when i = 10, or break a loop when i is defined as 10

let seeMore = document.getElementById("seeMoreNews");
        for(var i = 1; i < 4; i++){
            // console.log(i, newsArticles[i]);
             newsStories += `<li class="news-articles"><h3>${newsArticles[i].title}</h3></li>
             <li>${newsArticles[i].description}...<a href="${newsArticles[i].url}" alt="Link to ${newsArticles[i].title}" title="Link to ${newsArticles[i].title}">See full  article at ${newsArticles[i].source.name}</a> <i class="far fa-heart" id="favorites-heart" style="text-decoration: none; color: #C63D0F;"></i></li><br>`;
        }
        $('#news-data').html(newsStories);
        newsArray = [newsArticles[i].title];
    });
}
showNewsDataFunction.innerHTML = showNews();


console.log("NEWS ARRAY: ", newsArray);


   //WHEN USER PRESSES #favorites-heart THE ARTICLE IS SENT TO SAVED LIST

function saveNews() {
    console.log("SAVE THIS ARTICLE");
}

showNewsDataFunction.addEventListener("click", function onClick(event) {
    if(event.target.id == "favorites-heart") {
        saveNews();
    }else {
        console.log("noooooooooooo");
    }
});




var topArticleImage;
var showTopNewsImage = document.getElementById("heroNews");

function topImage() {
    getNews().then((image) => {
        topArticleImage = image.articles;
        // console.log("top article images", topArticleImage);

        let showImage = "";
        for(var x = 0; x < 1; x++) {
            showImage += `<a href="${topArticleImage[0].url}" alt="Link to ${topArticleImage[0].title}" title="Link to ${topArticleImage[0].title}"><img width="100%" src="${topArticleImage[0].urlToImage}"></a><div><h2 style="color: #FDF3E7">${topArticleImage[0].title}</h2></div>`;
        }
        $('#heroNews').html(showImage);
        
    });
}
showTopNewsImage.innerHTML = topImage();


var news10Articles;
$("#viewAllNews").click(() => {
    // console.log("news data div has been clicked");
    //render the dom with the #primaryContainer as empty

    showTop10();
  });

  
$("#news-icon").click(() => {
    console.log("news icon has been clicked");
    showTop10();
  });



  function showTop10() {
    getNews().then((news10Data) =>{
     news10Articles = news10Data.articles;

    let tenStories = "";
    let seeMore = document.getElementById("seeMoreNews");
            for(var i = 0; i < 10; i++){
                 tenStories += `<li class="news-articles" style="list-style-type: none"><h3>${news10Articles[i].title}</h3></li>
                 <li style="list-style-type: none">${news10Articles[i].description}...<a href="${news10Articles[i].url}" alt="Link to ${news10Articles[i].title}">See full  article at ${news10Articles[i].source.name}</a> <i class="far fa-heart" id="favorites-heart" style="text-decoration: none; color: #C63D0F;"></i></li><br>`;
            }
            $('#primaryContainer').html(tenStories);

        });
    }
    // showNewsDataFunction.addEventListener("click", function onClick(event) {
    //     if(event.target.id == "favorites-heart") {
    //         saveNews();
    //     }else {
    //         // console.log("noooooooooooo");
    //     }
    // });

    function addNews(newsObj) {
        console.log("add news articles to firebase", newsObj);
        return $.ajax({
          url: `${fireConfig.getFBsettings().databaseURL}/newsArticles.json`,
          type: 'POST',
          data: JSON.stringify(newsObj),
          dataType: 'json'
       }).done((userNews) => {
          return userNews;
       });
    }


module.exports = {getNews, topImage, addNews};