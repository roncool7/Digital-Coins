/// <reference path="../jquery-3.4.1.js" />
"use strict";

$(function () {
  //Report page
  $("#reportPage").click(function () {
    $('#main-header').css('display', 'none');
    $("#progress").css("display", "none");
    if (btnArray.length === 0) {
      $("#showAll").html(`<h1 id="emptyChart">Don't Have Any Coins Right Now...</h1>`);
    } else {
      reportsActiveFlag = true;
      $("#showAll").html(`<div id="chartContainer"></div>`);
    }
    //Chart CanvasJs
    var dataPoints = [];

    for (let [key, value] of Object.entries(btnArray)) {
      dataPoints.push({
        type: "line",
        xValueFormatString: 'hh:mm:ss',
        dataPoints: [],
        name: value.symbol,
        showInLegend: true,
      });

      var chart = new CanvasJS.Chart("chartContainer", {
        title: {
          text: "Watch Your Coins ON Real Time",
          fontColor: "gold",
          backgroundColor: "#000000",
        },
        legend: {
          cursor: "pointer",
          itemclick: toggleDataSeries
        },
        axisX: {
          title: "Coins Names",
          titleFontWeight: "bold",
        },
        axisY: {
          title: "Price Value In USD",
          titleFontColor: "#000000",
          lineColor: "#4F81BC",
          labelFontColor: "#4F81BC",
          includeZero: false
        },
        data: dataPoints
      });
    }
    updateChart();

    function updateChart() {
      for (let [key, value] of Object.entries(btnArray)) {
        var time = new Date();
        $.getJSON("https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + value.symbol + "&tsyms=USD", function (data) {
          dataPoints[key].dataPoints.push({ x: time, y: Object.values(data)[0].USD });
          chart.render();
        });
      }
      
      setTimeout(function () {
        if (reportsActiveFlag) {
          updateChart();
        }
      }, 2000);
    }

  });

  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  }

});