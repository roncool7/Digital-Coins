/// <reference path="jquery-3.4.1.js" />
"use strict";


//Report Page Flag stop loop
let reportsActiveFlag = false;
//Get all coins
let coinsList = [];
// Main
let btnArray = [];
// toggle button 
let deleteDraft = [];
let addDraft = {};

// More info button
function clickToShowInfo(id, buttonId) {
    let itemId = `#showId${buttonId}`;
    let date = new Date();
    let currentDatesArray = localStorage.getItem(`saveDate`);
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/" + id,
        error: err => alert(err.statusText+" "+"Coin Not Have Value Right Now"),
        success: coin => {
            let div =
                `<div id="infoBtn">
                         <p><img src="${coin.image.thumb}"</p>
                         <p>Dollar:${coin.market_data.current_price.usd}$</p>
                         <p>Euro:${coin.market_data.current_price.eur}€</p>
                         <p>ILS:${coin.market_data.current_price.ils}₪</p>
                     </div>`;
            $(`#showId${buttonId}`).html(div);
            localStorage.setItem(itemId, JSON.stringify(div));
            if (!currentDatesArray) {
                localStorage.setItem(`saveDate`, JSON.stringify({ itemId: date.getTime() }));
            } else {
                let parsedDates = JSON.parse(currentDatesArray);
                parsedDates[itemId] = date.getTime();
                localStorage.setItem(`saveDate`, JSON.stringify(parsedDates));
            }
        },
    })
}

//Toggle Button
function toggleBtn(name, id, toggleSymbol) {
    if ($(`#customSwitch${id}`).is(':checked') && btnArray.length < 5) {
        toggleOn(id, name, toggleSymbol);
    } else if (!$(`#customSwitch${id}`).is(':checked')) {
        toggleOff(id);
    } else {
        deleteDraft = [];
        addDraft = { id, name, toggleSymbol };
        $('#myModal').modal('toggle').on('shown.bs.modal', function () {
            $("#modalText").html(btnArray.map(x => x.value));
        });
    }
};

//toggle is on
function toggleOn(id, name, toggleSymbol) {
    $(`#customSwitch${id}`).val('TRUE');
    btnArray.push({ id: id, symbol: toggleSymbol, name: name, value: name + `<input type="checkbox" id="customSwitch${id}" onclick="modalBtn('${id}','${name}')">` });
    localStorage.setItem(`btnArray`, JSON.stringify(btnArray));
}

//toggle is off
function toggleOff(id) {
    document.getElementById(`customSwitch${id}`).checked = false;
    btnArray.splice(btnArray.findIndex(x => x.id === id), 1);
    localStorage.setItem(`btnArray`, JSON.stringify(btnArray));
}

// Modal BODY buttons
function modalBtn(id) {
    if ($(`#customSwitch${id}`).is(':checked')) {
        deleteDraft.push(id);
    } else {
        deleteDraft.slice(deleteDraft.findIndex(x = x.id === id), 1);
    }
}

// If user close modal checked = false
function getLastCoin(id) {
    document.getElementById(`customSwitch${id}`).checked = false;
}

//Modal Close button
function modalClose() {
    getLastCoin(addDraft.id);
    $("#myModal").modal('hide');
}

// Modal Save button
function modalSave() {
    if (btnArray.length - deleteDraft.length > 4) {
        alert("Maximum Coins its 5")
    } else {
        toggleOn(addDraft.id, addDraft.name, addDraft.toggleSymbol);
        deleteDraft.forEach(x => toggleOff(x));
        $("#myModal").modal('hide');
    }
}

// Search button
$("#searchButton").click(() => {
    if ($("#inputValue").val() == "") {
        alert("Empty Field try again...")
    } else {
        $('#main-header').css('display', 'none');
        const inputValue = $("#inputValue").val();
        const coins = coinsList.find(x => x.symbol.toUpperCase() === inputValue.toUpperCase() || x.name.toUpperCase() === inputValue.toUpperCase());
        if (coins === undefined) {
            $('#main-header').css('display', 'block');
            alert("Wrong Name/Symbol...");
            return;
        }
        let toggleId = coins.id;
        let collapseId = 0;
        const div = getCardDiv(coins.symbol, coins.name, toggleId, collapseId, coins.id);
        $("#showAll").html(`<h1 id="searchTitle">Search Result</h1>` + div);
    }
});

//Get all coins parameters
function getCardDiv(symbol, name, toggleId, index, id) {
    return `<div class="card" id="allCoins">
            <p class="card-text">${symbol}</p>
                <p class="card-text">${name}</p>
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" ${isExistsInLocalStorage(toggleId)} id="customSwitch${toggleId}" onclick="toggleBtn('${name}','${toggleId}','${symbol}','${index}')">
                <label class="custom-control-label" for="customSwitch${toggleId}"></label>
            </div>
            <button class="btn btn-warning moreInfoBtn" type="button" data-toggle="collapse" data-target="#showId${index}" onclick="clickToShowInfo('${id}','${index}')">More Info</button>
                <div id="showId${index}" class="collapse"></div> 
        </div>`;
}

//Save checked on local storage
function isExistsInLocalStorage(toggleId) {
    let storageBtnArray = localStorage.getItem('btnArray');
    if (storageBtnArray) {
        let parsedStorageBtnArray = JSON.parse(storageBtnArray);
        for (let button of parsedStorageBtnArray) {
            if (button.id == toggleId) {
                return 'checked';
            }
        }
    }
}

//Active coins
$("#activeCoins").on("click", function () {
    $('#main-header').css('display','none');
    if (btnArray.length === 0) {
        $("#showAll").html(`<h1 id="emptyCoins">Don't Have Active Coins Right Now...</h1>`);
    } else {
        let html = "";
        let collapseId = 0;
        for (let coin of btnArray) {
            let coinSymbol = coin.symbol;
            let coinName = coin.name.toLowerCase().split(' ').join('-');
            let toggleId = coin.id;
            const div = getCardDiv(coinSymbol, coinName, toggleId, collapseId, coinName);
            html += div;
            collapseId++;
        }
        $("#showAll").html(`<h1 id="activeCoinsTitle">Active Coins</h1>` + html);
    }
})