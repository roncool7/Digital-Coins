/// <reference path="../jquery-3.4.1.js" />
"use strict";

(function () {
    //local storage if item exists
    let storageBtnArray = localStorage.getItem('btnArray'); 
    if(storageBtnArray){
        btnArray = JSON.parse(storageBtnArray);
    }
    saveAtLocalStorage();
    // get all coins on load
    $("#showAll").empty();
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/list",
        error: err => alert("Error " + err.status),
        success: onSuccessCoinsList
    })
})();

// Show all coins
function onSuccessCoinsList(coins) {
    let html = "";
    let toggleId = 0;
    coinsList = coins;
    for (let i = 0; i < 100; i++) {
        const div = getCardDiv(coins[i].symbol,coins[i].name,toggleId,i,coins[i].id);
        html += div;
        toggleId++;
    }
    $("#showAll").html(html);
    $("#progress").css("display", "none");
}

//Home page 
$("#homePage").on("click",function(){
    reportsActiveFlag = false;
    $("#showAll").empty();
    $("#progress").css("display", "block");
    $('#main-header').css('display','block');
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/list",
        error: err => alert("Error " + err.status),
        success: onSuccessCoinsList
    })
})

//More info save local storage for 2 min
function saveAtLocalStorage(){
    let getDates = localStorage.getItem('saveDate');
    let nowDate = new Date();
    let nowTime = nowDate.getTime();
    if(getDates){
        let parsedDates = JSON.parse(getDates);
        for(let key in parsedDates){
            let getTime = parsedDates[key];
            let difference = nowTime - getTime;
            let diffMins = Math.round(((difference % 86400000) % 3600000) / 60000); 
            if(diffMins >= 2){
                localStorage.removeItem(key);
                delete parsedDates[key];
            }
        }        
        if(Object.keys(parsedDates).length == 0){
            localStorage.removeItem('saveDate');
        }else{
            localStorage.setItem('saveDate',JSON.stringify(parsedDates));
        }
    }
}