"use strict";
// This module only receives the data. 


let $ = require('jquery');

function savedUserNews(newsList) {
    let $showNewsItems = $(`<div class="container-fluid">
    <ul class="item-list"></ul>
    </div>`);
    $(".wrap").html($showNewsItems);
    for (let newsItems in newsList) {
        let favoriteItem = newsList[newsItems],
        newsListItem = $("<li>", {class: "news-articles"}),
        newsListEdit = $("<a>", {text: "delete" });

        
    }
}